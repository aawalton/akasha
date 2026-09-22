import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  installedUnitName,
  isScheduled,
  PAGES_UNIT,
  SERVICE_SUFFIX,
  type Service,
  serviceUnitName,
  serviceUnitText,
  TIMER_SUFFIX,
  timerUnitName,
  timerUnitText,
} from "akasha/infrastructure/service/workstation/modules/unit-writing/unit-writing.module.code.ts"

const STAGING = ".local/state/workstation-services"
const SYSTEMD = ".config/systemd/user"

export type Ran = {
  readonly code: number
  readonly out: string
}

export type Plan = {
  readonly write: ReadonlyMap<string, string>
  readonly enable: readonly string[]
  readonly stop: readonly string[]
  readonly remove: readonly string[]
  readonly restart?: readonly string[]
  readonly strand?: readonly string[]
}

export type Done = {
  readonly did: readonly string[]
  readonly refused: readonly string[]
}

export function homeAt(): string | null {
  const stated = optionalEnv("HOME")
  if (stated === undefined) return null
  return existsSync(stated) ? realpathSync(stated) : stated
}

export function stagingDir(home: string): string {
  return join(home, STAGING)
}

export function systemdDir(home: string): string {
  return join(home, SYSTEMD)
}

function isUnit(name: string): boolean {
  return name.endsWith(SERVICE_SUFFIX) || name.endsWith(TIMER_SUFFIX)
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
    if (!isUnit(name)) continue
    const at = join(systemdDir(home), name)
    try {
      if (!lstatSync(at).isSymbolicLink()) continue
      if (realpathSync(at).startsWith(`${ours}/`)) found.push(name)
    } catch {}
  }
  return found.sort()
}

export function ourStaged(home: string): readonly string[] {
  let names: readonly string[]
  try {
    names = readdirSync(stagingDir(home))
  } catch {
    return []
  }
  return names.filter(isUnit).sort()
}

export function strandedAmong(
  staged: readonly string[],
  owned: readonly string[],
  plan: Plan
): readonly string[] {
  const accounted = new Set(plan.write.keys())
  const installed = new Set(owned)
  return staged.filter((one) => !accounted.has(one) && !installed.has(one)).sort()
}

export function textFor(given: Service): ReadonlyMap<string, string> {
  const held = new Map<string, string>()
  held.set(serviceUnitName(given), serviceUnitText(given))
  const timer = timerUnitText(given)
  if (timer !== null) held.set(timerUnitName(given), timer)
  return held
}

function pagesFirst(a: string, b: string): number {
  if (a === b) return 0
  if (a === PAGES_UNIT) return -1
  if (b === PAGES_UNIT) return 1
  return a < b ? -1 : 1
}

export function planFor(
  services: readonly Service[],
  owned: readonly string[],
  restarting: ReadonlySet<string> = new Set(),
  shared: ReadonlyMap<string, string> = new Map()
): Plan {
  const write = new Map<string, string>(shared)
  const enable: string[] = []
  const stop: string[] = []
  const restart: string[] = []
  for (const one of services) {
    for (const [name, text] of textFor(one)) write.set(name, text)
    const named = installedUnitName(one)
    if (one.service.enabled) enable.push(named)
    else stop.push(named)
    if (one.service.enabled && !isScheduled(one) && restarting.has(one.service.slug)) {
      if (one.service.restartsItself !== true) restart.push(serviceUnitName(one))
    }
  }
  const ours = new Set(write.keys())
  const remove = owned.filter((one) => !ours.has(one)).sort()
  return {
    write,
    enable: enable.sort(),
    stop: stop.sort(),
    remove,
    restart: restart.sort(pagesFirst),
  }
}

export function systemctl(args: readonly string[]): Ran {
  const held = ran(["systemctl", "--user", ...args])
  return { code: held.code, out: `${held.out}${held.err}`.trim() }
}

export function writeStaged(home: string, name: string, text: string): undefined {
  const at = stagingDir(home)
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, name), text)
}

export function linkUnit(home: string, name: string): boolean {
  const target = join(stagingDir(home), name)
  const at = join(systemdDir(home), name)
  mkdirSync(systemdDir(home), { recursive: true })
  try {
    if (lstatSync(at).isSymbolicLink() && realpathSync(at) === target) return false
    rmSync(at, { force: true })
  } catch {
    rmSync(at, { force: true })
  }
  symlinkSync(target, at)
  return true
}

function dropStaged(home: string, name: string): undefined {
  rmSync(join(stagingDir(home), name), { force: true })
}

export function unlinkUnit(home: string, name: string, did: string[] = []): undefined {
  rmSync(join(systemdDir(home), name), { force: true })
  did.push(`unlinked ${name}`)
  dropStaged(home, name)
  did.push(`removed ${name}`)
}

export function installing(
  home: string,
  plan: Plan,
  run: (args: readonly string[]) => Ran = systemctl,
  did: string[] = []
): Done {
  const refused: string[] = []
  const took = (what: string, done: Ran): undefined => {
    if (done.code === 0) did.push(what)
    else refused.push(`${what}: ${done.out.slice(0, 200)}`)
  }

  for (const [name, text] of plan.write) {
    writeStaged(home, name, text)
    did.push(`wrote ${name}`)
    if (linkUnit(home, name)) did.push(`linked ${name}`)
  }

  for (const name of plan.remove) {
    took(`stopped ${name}`, run(["stop", name]))
    took(`disabled ${name}`, run(["disable", name]))
    unlinkUnit(home, name, did)
  }

  for (const name of plan.strand ?? []) {
    dropStaged(home, name)
    did.push(`took away ${name}`)
  }

  took("reloaded", run(["daemon-reload"]))

  for (const name of plan.enable) took(`enabled ${name}`, run(["enable", "--now", name]))
  for (const name of plan.restart ?? []) took(`restarted ${name}`, run(["restart", name]))
  for (const name of plan.stop) {
    took(`stopped ${name}`, run(["stop", name]))
    took(`disabled ${name}`, run(["disable", name]))
    if (linkUnit(home, name)) did.push(`linked ${name} again`)
  }
  if (plan.stop.length > 0) took("reloaded", run(["daemon-reload"]))

  return { did, refused }
}
