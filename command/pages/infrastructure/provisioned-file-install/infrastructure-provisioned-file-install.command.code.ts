import { accessSync, constants, existsSync, lstatSync, readFileSync, readlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { plan as planArgument } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  naming,
  OPERATIONAL,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  forMachine,
  machineNow,
} from "akasha/command/modules/install-linking/install-linking.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { infrastructureProvisionedFileInstall as page } from "akasha/command/pages/infrastructure/provisioned-file-install/infrastructure-provisioned-file-install.command.ts"
import {
  answeringIn,
  bodyAt,
  type Entry,
  entriesIn,
  HOSTS_AT,
  callsFor as hostCallsFor,
  lineOf,
} from "akasha/infrastructure/machine/host/modules/hosts-entering/hosts-entering.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import {
  indexThere,
  readingIn,
  type Valued,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PLACED = "provisioned-file"

const CONTENT = "content"

const INSTALLED_AT = "installPath"

const PLACED_BY = "placedBy"

const ONLY_ON = "onlyOn"

const RELOAD_WITH = "reloadWith"

const MASKED_UNITS = "maskedUnits"

const UNITS_BY = "systemctl"

const STATE_OF = "is-enabled"

const MASK = "mask"

const MASKED = "masked"

const BY_LINK = "link"

const BY_COPY = "copy"

const UNDER_HOME = "~/"

const AS_ROOT = "sudo"

const MODE = "0644"

const A_SHELL = "sh"

const READ_BY = "-c"

const AT_MOST = 200

const ALL_PLACED = "nothing\teverything this places is already where its page says"

const NOT_PLACED = "plan\tnothing was placed; run it again without `--plan` to carry it out"

const NOTHING_PLACED = "nothing was placed"

export type Placing = {
  readonly page: string
  readonly file: string
  readonly at: string
  readonly by: string
  readonly reload: string | null
}

type Masking = {
  readonly page: string
  readonly unit: string
}

type Weighing = {
  readonly placings: readonly Placing[]
  readonly wrong: readonly string[]
  readonly maskings: readonly Masking[]
}

type Masked = {
  readonly masking: Masking
  readonly already: boolean
  readonly saying: string
}

type Standing = {
  readonly placing: Placing
  readonly already: boolean
  readonly saying: string
}

type Stood = {
  readonly standings: readonly Standing[]
  readonly wrong: readonly string[]
}

type Entering = {
  readonly entry: Entry
  readonly already: boolean
  readonly saying: string
}

type Entered = {
  readonly enterings: readonly Entering[]
  readonly wrong: readonly string[]
}

export type Ran = {
  readonly code: number
  readonly out: string
}

export type Running = (argv: readonly string[]) => Ran

type Saying = (said: string) => undefined

type Done = {
  readonly did: readonly string[]
  readonly refused: readonly string[]
}

function placingOf(reading: Reading, one: Valued, on: string): Placing | null {
  const at = textAt(one.value, INSTALLED_AT)
  if (at === null || at === "" || at.startsWith(UNDER_HOME)) return null
  const by = textAt(one.value, PLACED_BY)
  if (by !== BY_LINK && by !== BY_COPY) return null
  if (!forMachine(textAt(one.value, ONLY_ON), on)) return null
  return {
    page: one.path,
    file: fileOf(reading, one, PLACED, CONTENT),
    at,
    by,
    reload: textAt(one.value, RELOAD_WITH),
  }
}

function maskingsOf(one: Valued, on: string): readonly Masking[] {
  if (!forMachine(textAt(one.value, ONLY_ON), on)) return []
  return (textsAt(one.value, MASKED_UNITS) ?? []).map((unit) => ({ page: one.path, unit }))
}

export function weighedIn(root: string, on: string = machineNow()): Weighing {
  const placings: Placing[] = []
  const wrong: string[] = []
  const maskings: Masking[] = []
  const reading = readingIn(root)
  if (!indexThere(reading)) return { placings, wrong, maskings }
  for (const one of valuesOfType(reading, PLACED)) {
    for (const held of maskingsOf(one, on)) {
      if (!maskings.some((was) => was.unit === held.unit)) maskings.push(held)
    }
    try {
      const held = placingOf(reading, one, on)
      if (held !== null) placings.push(held)
    } catch (thrown) {
      wrong.push(
        `${one.path} says where its body is read, and nothing was placed — ${whyOf(thrown)}`
      )
    }
  }
  return { placings, wrong, maskings }
}

function bodyOf(root: string, one: Placing): string {
  const from = join(root, one.file)
  if (lstatSync(from, { throwIfNoEntry: false }) === undefined) {
    throw new Error(`${one.file} is not there for ${one.at} to be placed from`)
  }
  return from
}

function linkStanding(root: string, one: Placing): Standing {
  const from = bodyOf(root, one)
  const held = lstatSync(one.at, { throwIfNoEntry: false })
  if (held !== undefined && !held.isSymbolicLink()) {
    throw new Error(`${one.at} is a file of its own rather than a link, and is left as it was`)
  }
  if (held !== undefined && readlinkSync(one.at) === from) {
    return { placing: one, already: true, saying: `${one.at} is already linked to ${one.file}` }
  }
  return { placing: one, already: false, saying: `link ${one.at} to ${one.file}` }
}

function copyStanding(root: string, one: Placing): Standing {
  const from = bodyOf(root, one)
  const held = lstatSync(one.at, { throwIfNoEntry: false })
  if (held?.isSymbolicLink() === true) {
    throw new Error(`${one.at} is a link rather than a file of its own, and is left as it was`)
  }
  if (held !== undefined && readFileSync(one.at).equals(readFileSync(from))) {
    return { placing: one, already: true, saying: `${one.at} is already copied from ${one.file}` }
  }
  return { placing: one, already: false, saying: `copy ${one.file} to ${one.at}` }
}

export function stoodFor(root: string, weighed: Weighing): Stood {
  const standings: Standing[] = []
  const wrong: string[] = [...weighed.wrong]
  for (const one of weighed.placings) {
    try {
      standings.push(one.by === BY_LINK ? linkStanding(root, one) : copyStanding(root, one))
    } catch (thrown) {
      wrong.push(`${one.page} is read at ${one.at}, and nothing was placed — ${whyOf(thrown)}`)
    }
  }
  return { standings, wrong }
}

function enteringOf(entry: Entry, body: string): Entering {
  const held = answeringIn(body, entry.name)
  if (held !== null && held !== entry.address) {
    throw new Error(`${entry.name} is answered at ${held} there, and is left as it was`)
  }
  if (held !== null) {
    return { entry, already: true, saying: `${HOSTS_AT} already answers ${lineOf(entry)}` }
  }
  return { entry, already: false, saying: `answer ${lineOf(entry)} in ${HOSTS_AT}` }
}

export function enteredFor(entries: readonly Entry[], body: string): Entered {
  const enterings: Entering[] = []
  const wrong: string[] = []
  for (const entry of entries) {
    try {
      enterings.push(enteringOf(entry, body))
    } catch (thrown) {
      wrong.push(
        `${entry.page} answers at ${entry.address}, and nothing was placed — ${whyOf(thrown)}`
      )
    }
  }
  return { enterings, wrong }
}

function enteredIn(root: string, body: string = bodyAt()): Entered {
  return enteredFor(entriesIn(root), body)
}

export function maskedFor(maskings: readonly Masking[], run: Running): readonly Masked[] {
  return maskings.map((masking) => {
    const already = run([UNITS_BY, STATE_OF, masking.unit]).out === MASKED
    const saying = already ? `${masking.unit} is already masked` : `mask ${masking.unit}`
    return { masking, already, saying }
  })
}

function rooted(): boolean {
  return (process.getuid?.() ?? 0) === 0
}

function rootNeededAt(at: string): boolean {
  if (rooted()) return false
  let here = dirname(at)
  for (;;) {
    if (existsSync(here)) {
      try {
        accessSync(here, constants.W_OK)
        return false
      } catch {
        return true
      }
    }
    const up = dirname(here)
    if (up === here) return true
    here = up
  }
}

function underRoot(needs: boolean, argv: readonly string[]): readonly string[] {
  return needs ? [AS_ROOT, ...argv] : argv
}

export function callsFor(
  root: string,
  one: Placing,
  needs: boolean
): readonly (readonly string[])[] {
  const from = join(root, one.file)
  const put =
    one.by === BY_LINK ? ["ln", "-sfn", from, one.at] : ["install", "-m", MODE, "-T", from, one.at]
  return [underRoot(needs, ["mkdir", "-p", dirname(one.at)]), underRoot(needs, put)]
}

function placedSaying(one: Placing): string {
  return one.by === BY_LINK
    ? `linked ${one.at} to ${one.file}`
    : `copied ${one.at} from ${one.file}`
}

export function running(argv: readonly string[]): Ran {
  const held = ran([...argv])
  return { code: held.code, out: `${held.out}${held.err}`.trim() }
}

function onward(said: string): undefined {
  process.stderr.write(`${said}\n`)
}

export function placedEach(
  root: string,
  standings: readonly Standing[],
  run: Running,
  saying: Saying,
  did: string[],
  enterings: readonly Entering[] = [],
  maskeds: readonly Masked[] = []
): Done {
  const refused: string[] = []
  const took = (what: string, argv: readonly string[]): boolean => {
    const held = run(argv)
    if (held.code === 0) return true
    refused.push(`${what}: ${held.out.slice(0, AT_MOST)}`)
    return false
  }
  const reloads: string[] = []
  for (const one of standings) {
    if (one.already) continue
    const needs = rootNeededAt(one.placing.at)
    saying(needs ? `${one.saying}, as root` : one.saying)
    if (!callsFor(root, one.placing, needs).every((argv) => took(one.saying, argv))) continue
    did.push(placedSaying(one.placing))
    const reload = one.placing.reload
    if (reload !== null && reload !== "" && !reloads.includes(reload)) reloads.push(reload)
  }
  for (const one of enterings) {
    const needs = rootNeededAt(HOSTS_AT)
    saying(needs ? `${one.saying}, as root` : one.saying)
    if (hostCallsFor(one.entry).every((argv) => took(one.saying, underRoot(needs, argv)))) {
      did.push(`answered ${lineOf(one.entry)} in ${HOSTS_AT}`)
    }
  }
  for (const said of reloads) {
    saying(`run ${said}`)
    if (took(`ran ${said}`, [A_SHELL, READ_BY, said])) did.push(`ran ${said}`)
  }
  for (const one of maskeds) {
    if (one.already) continue
    const needs = !rooted()
    saying(needs ? `${one.saying}, as root` : one.saying)
    if (took(one.saying, underRoot(needs, [UNITS_BY, MASK, one.masking.unit]))) {
      did.push(`masked ${one.masking.unit}`)
    }
  }
  return { did, refused }
}

function placedWith(
  root: string,
  report: readonly string[],
  standings: readonly Standing[],
  run: Running,
  saying: Saying,
  done: string[],
  enterings: readonly Entering[] = [],
  maskeds: readonly Masked[] = []
): Answer {
  const held = placedEach(root, standings, run, saying, done, enterings, maskeds)
  const said = [...report, ...held.did.map((what) => `did\t${what}`)]
  if (held.refused.length > 0) return answeredWith(said, held.refused, OPERATIONAL)
  return told(said)
}

function placedBy(
  root: string,
  report: readonly string[],
  standings: readonly Standing[],
  run: Running,
  saying: Saying,
  enterings: readonly Entering[] = [],
  maskeds: readonly Masked[] = []
): Promise<Answer> {
  return answering((done) =>
    naming(done, placedWith(root, report, standings, run, saying, done, enterings, maskeds))
  )
}

export async function infrastructureProvisionedFileInstall(
  argv: readonly string[],
  given: Given,
  run: Running = running,
  saying: Saying = onward
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [planArgument])
  if ("refused" in read) return mistaking(read.refused)

  const weighed = weighedIn(given.root)
  const stood = stoodFor(given.root, weighed)
  const entered = enteredIn(given.root)
  const wrong = [...stood.wrong, ...entered.wrong]
  if (wrong.length > 0) return answeredWith([], [...wrong, NOTHING_PLACED], DATA)

  const masked = maskedFor(weighed.maskings, run)
  const held = [...stood.standings, ...entered.enterings, ...masked]
  const left = held.filter((one) => one.already).map((one) => `left\t${one.saying}`)
  const place = stood.standings.filter((one) => !one.already)
  const enter = entered.enterings.filter((one) => !one.already)
  const mask = masked.filter((one) => !one.already)
  if (place.length === 0 && enter.length === 0 && mask.length === 0) {
    return told([...left, ALL_PLACED])
  }

  const report = [...left, ...[...place, ...enter, ...mask].map((one) => `place\t${one.saying}`)]
  if (read.taken.plan) return told([...report, NOT_PLACED])
  return await placedBy(given.root, report, place, run, saying, enter, mask)
}
