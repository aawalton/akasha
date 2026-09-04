import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { ran } from "@akasha/utils-run/running"
import {
  installedUnitName,
  type Service,
  serviceUnitText,
  timerUnitText,
} from "../unit-writing/unit-writing.module.code.ts"

const STAGING = ".local/state/workstation-services"
const SYSTEMD = ".config/systemd/user"
const SERVICE_SUFFIX = ".service"
const TIMER_SUFFIX = ".timer"

export type Ran = {
  readonly code: number
  readonly out: string
}

export type Plan = {
  readonly write: ReadonlyMap<string, string>
  readonly enable: readonly string[]
  readonly stop: readonly string[]
  readonly remove: readonly string[]
}

export type Done = {
  readonly did: readonly string[]
  readonly refused: readonly string[]
}

export function homeAt(): string | null {
  const stated = process.env.HOME
  if (stated === undefined || stated === "") return null
  return existsSync(stated) ? realpathSync(stated) : stated
}

export function stagingDir(home: string): string {
  return join(home, STAGING)
}

export function systemdDir(home: string): string {
  return join(home, SYSTEMD)
}

export function ourInstalled(home: string): readonly string[] {
  const ours = stagingDir(home)
  const found: string[] = []
  let names: readonly string[]
  try {
    names = readdirSync(systemdDir(home))
  } catch {
    return []
  }
  for (const name of names) {
    if (!name.endsWith(SERVICE_SUFFIX) && !name.endsWith(TIMER_SUFFIX)) continue
    const at = join(systemdDir(home), name)
    try {
      if (!lstatSync(at).isSymbolicLink()) continue
      if (realpathSync(at).startsWith(`${ours}/`)) found.push(name)
    } catch {}
  }
  return found.sort()
}

export function ownedByService(owned: readonly string[], slug: string): readonly string[] {
  const mine = new Set([`${slug}${SERVICE_SUFFIX}`, `${slug}${TIMER_SUFFIX}`])
  return owned.filter((one) => mine.has(one))
}

export function unitChanged(home: string, name: string, text: string): boolean {
  const at = join(stagingDir(home), name)
  if (!existsSync(at)) return true
  try {
    return readFileSync(at, "utf8") !== text
  } catch {
    return true
  }
}

export function textFor(given: Service): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  held.set(`${given.service.slug}${SERVICE_SUFFIX}`, serviceUnitText(given))
  const timer = timerUnitText(given)
  if (timer !== null) held.set(`${given.service.slug}${TIMER_SUFFIX}`, timer)
  return held
}

export function planFor(standing: readonly Service[], owned: readonly string[]): Plan {
  const write = new Map<string, string>()
  const enable: string[] = []
  const stop: string[] = []
  for (const one of standing) {
    for (const [name, text] of textFor(one)) write.set(name, text)
    const named = installedUnitName(one)
    if (one.service.enabled) enable.push(named)
    else stop.push(named)
  }
  const ours = new Set(write.keys())
  const remove = owned.filter((one) => !ours.has(one)).sort()
  return { write, enable: enable.sort(), stop: stop.sort(), remove }
}

export function systemctl(args: readonly string[]): Ran {
  const held = ran(["systemctl", "--user", ...args])
  return { code: held.code, out: `${held.out}${held.err}`.trim() }
}

export function writeUnit(home: string, name: string, text: string): undefined {
  const at = stagingDir(home)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, name), text)
}

export function linkUnit(home: string, name: string): undefined {
  const target = join(stagingDir(home), name)
  const at = join(systemdDir(home), name)
  mkdirSync(systemdDir(home), { recursive: true })
  try {
    if (lstatSync(at).isSymbolicLink() && realpathSync(at) === target) return
    rmSync(at, { force: true })
  } catch {
    rmSync(at, { force: true })
  }
  symlinkSync(target, at)
}

export function unlinkUnit(home: string, name: string): undefined {
  rmSync(join(systemdDir(home), name), { force: true })
  rmSync(join(stagingDir(home), name), { force: true })
}

export function installing(home: string, plan: Plan): Done {
  const did: string[] = []
  const refused: string[] = []
  const took = (what: string, done: Ran): undefined => {
    if (done.code === 0) did.push(what)
    else refused.push(`${what}: ${done.out.slice(0, 200)}`)
  }

  for (const [name, text] of plan.write) {
    writeUnit(home, name, text)
    linkUnit(home, name)
    did.push(`wrote ${name}`)
  }

  for (const name of plan.remove) {
    took(`removed ${name}`, systemctl(["disable", "--now", name]))
    unlinkUnit(home, name)
  }

  took("reloaded", systemctl(["daemon-reload"]))

  for (const name of plan.enable) took(`enabled ${name}`, systemctl(["enable", "--now", name]))
  for (const name of plan.stop) took(`stopped ${name}`, systemctl(["disable", "--now", name]))

  return { did, refused }
}
