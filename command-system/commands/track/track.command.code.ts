import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { readMountainWallTime } from "@akasha/day/mountain-wall"
import { mistaking } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"
import { SCRATCH_AT } from "../../scratching/scratching.module.code.ts"
import { filing } from "../write/write.command.code.ts"
import {
  difficultyForTitle,
  readDifficulty,
  readSafety,
} from "./session-leveling/session-leveling.module.code.ts"
import {
  ACTS,
  AT,
  activitiesIn,
  addressed,
  BARE,
  carriedIn,
  DAY,
  DIFFICULTY,
  DRY_RUN,
  dayNow,
  END,
  FROM_FILE,
  faultsIn,
  type Held,
  heldFor,
  instantIn,
  JSON_SAID,
  levelsFor,
  linesOf,
  MEND,
  mintedAt,
  openIn,
  type Row,
  relationshipsFor,
  relationshipsIn,
  SESSION,
  START,
  saidFor,
  sayingFor,
  shownOf,
  TITLE,
  taggedFor,
  taggingOf,
  UNBUILT,
  VALUED,
} from "./session-rows/session-rows.module.code.ts"
import { dayBefore, sleeping, wokeInto } from "./waking/waking.module.code.ts"

function telling(lines: string): Answer {
  return { report: lines === "" ? [] : [lines], refusals: [], code: 0 }
}

type Landing = { readonly held: Held; readonly rows: Row[] }

type Ending = Landing & { readonly stretch: Row }

async function landedAcross(
  landings: readonly Landing[],
  said: string,
  given: Given
): Promise<Answer> {
  const at = (path: string): string =>
    path.startsWith(given.root) ? path.slice(given.root.length).replace(/^\//, "") : path
  const last = landings[landings.length - 1]
  if (last === undefined) return mistaking(["this act composed no day"])
  const body = new TextEncoder().encode(linesOf(last.rows))
  const rest = landings.slice(0, -1)
  if (rest.length === 0) {
    const only = ["--file-path", at(last.held.path), "--message", said]
    return await filing(only, given, () => ({ bytes: body }))
  }
  const scratch = mkdtempSync(join(SCRATCH_AT, "akasha-track-"))
  try {
    const argv: string[] = []
    rest.forEach((one, index) => {
      const beside = join(scratch, `day-${String(index)}`)
      writeFileSync(beside, linesOf(one.rows))
      argv.push("--file-path", at(one.held.path), "--content-file", beside)
    })
    argv.push("--file-path", at(last.held.path), "--message", said)
    return await filing(argv, given, () => ({ bytes: body }))
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

async function landed(
  held: Held,
  rows: readonly Row[],
  said: string,
  given: Given
): Promise<Answer> {
  return await landedAcross([{ held, rows: [...rows] }], said, given)
}

function endingIn(
  root: string,
  day: string,
  held: Held,
  rows: Row[],
  act: string
): Ending | string {
  const open = openIn(rows)
  if (open !== null) return { held, rows, stretch: open }
  if (act === "switch") {
    const before = heldFor(root, dayBefore(day))
    if (typeof before !== "string") {
      const beforeRows = before.rows.map((one) => ({ ...one }))
      const found = openIn(beforeRows)
      if (found !== null && sleeping(found.title)) {
        return { held: before, rows: beforeRows, stretch: found }
      }
    }
  }
  return "this day carries no open stretch to end"
}

function movedInto(root: string, from: Ending, ended: string): Landing | string {
  const target = heldFor(root, wokeInto(ended))
  if (typeof target === "string") return target
  const rows = target.rows.map((one) => ({ ...one }))
  from.rows.splice(from.rows.indexOf(from.stretch), 1)
  rows.push({ ...from.stretch, dailyTracking: target.page })
  rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  return { held: target, rows }
}

export async function track(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const noun = argv[0]
  if (noun !== SESSION) {
    return mistaking([
      `${SESSION} is the only thing this acts on, and this call names ${noun ?? "none"}`,
    ])
  }
  const act = argv[1]
  if (act === undefined || !ACTS.includes(act)) {
    return mistaking([`the act is the second word, and ${act ?? "none"} is no act this takes`])
  }
  if (UNBUILT.includes(act)) {
    return refused(`\`${act}\` states what it takes on its page and carries no act yet`, 1)
  }
  const rest = argv.slice(2)
  for (const said of rest) {
    if (said.startsWith("--") && !VALUED.includes(said) && !BARE.includes(said)) {
      return mistaking([`${said} is no flag this takes`])
    }
  }
  const day = saidFor(rest, DAY) ?? dayNow(now)
  const held = heldFor(given.root, day)
  if (typeof held === "string") return mistaking([held])
  const activities = activitiesIn(given.root)
  const rows = held.rows.map((one) => ({ ...one }))

  if (act === "show") {
    return telling(rest.includes(JSON_SAID) ? JSON.stringify(rows, null, 2) : shownOf(rows))
  }
  if (act === "check") {
    const faults = faultsIn(rows, held.page)
    return faults.length === 0 ? telling("") : mistaking(faults)
  }

  const known = relationshipsIn(given.root)
  const tagging = relationshipsFor(rest, known)
  if (tagging !== null && tagging.read === "refused") return mistaking(tagging.refusals)
  const stated = tagging === null ? null : tagging.ids

  const open = openIn(rows)
  if (act === "amend") {
    const found = addressed(rest, rows, now)
    if (typeof found === "string") return mistaking([found])
    const title = saidFor(rest, TITLE) ?? found.title
    const levels = levelsFor(rest, title, found, activities)
    if (levels.read === "refused") return mistaking(levels.refusals)
    const kept = typeof found.difficultyLevel === "string" ? found.difficultyLevel : undefined
    const changing: { safetyLevel?: string; difficultyLevel?: string } = { ...levels.levels }
    if (saidFor(rest, DIFFICULTY) === null) changing.difficultyLevel = kept
    const carried = carriedIn(found)
    const tags =
      stated === null && saidFor(rest, TITLE) === null
        ? carried
        : taggedFor(stated, title, carried, known)
    Object.assign(found, changing, { title })
    if (tags.length === 0) delete found.relationships
    else found.relationships = tags
    if (changing.difficultyLevel === undefined) delete found.difficultyLevel
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf([found]))
    return await landed(held, rows, `Amend ${title} on ${day}`, given)
  }

  if (act === "file") {
    const from = saidFor(rest, FROM_FILE)
    if (from === null) return mistaking([`${FROM_FILE} names the file the lines are read from`])
    let said: string
    try {
      said = readFileSync(from === "-" ? "/dev/stdin" : from, "utf8")
    } catch {
      return mistaking([`the lines for ${day} would not open from ${from}`])
    }
    const lines = said.split("\n").filter((one) => one.trim() !== "")
    if (lines.length === 0) return mistaking(["the lines handed in carry no stretch"])
    const made: Row[] = []
    const refusals: string[] = []
    for (const [at, line] of lines.entries()) {
      const named = `line ${String(at + 1)}`
      const found = /^(\S+)\s+(.+?)(?:\s+s(-?[\d.]+)d([\d.]+))?$/.exec(line.trim())
      if (found === null) {
        refusals.push(`${named} opens with no wall time and a title`)
        continue
      }
      const reading = readMountainWallTime(found[1] ?? "", now)
      if (reading.read === "refused") {
        refusals.push(`${named}: ${reading.saying}`)
        continue
      }
      const title = (found[2] ?? "").trim()
      const one: Row = {
        id: mintedAt(now),
        title,
        startTime: reading.iso,
        dailyTracking: held.page,
        ...taggingOf(taggedFor(stated, title, [], known)),
      }
      const safety = found[3]
      if (safety === undefined) {
        const before = made[made.length - 1]
        const carried = before?.safetyLevel
        if (typeof carried === "string") one.safetyLevel = carried
      } else {
        const level = readSafety(safety)
        if (level.read === "refused") refusals.push(`${named}: ${level.saying}`)
        else one.safetyLevel = level.level
      }
      const difficulty = found[4]
      if (difficulty === undefined) {
        const inferred = difficultyForTitle(title, activities)
        if (inferred !== null) one.difficultyLevel = inferred
      } else {
        const level = readDifficulty(difficulty)
        if (level.read === "refused") refusals.push(`${named}: ${level.saying}`)
        else one.difficultyLevel = level.level
      }
      made.push(one)
    }
    for (let at = 1; at < made.length; at += 1) {
      const before = made[at - 1]
      const one = made[at]
      if (before === undefined || one === undefined) continue
      if (new Date(one.startTime).getTime() <= new Date(before.startTime).getTime()) {
        refusals.push(`line ${String(at + 1)} begins at or before the line above it`)
        continue
      }
      before.endTime = one.startTime
    }
    const faults = [...refusals, ...faultsIn(made, held.page)]
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf(made))
    return await landed(held, made, `File ${String(made.length)} stretches on ${day}`, given)
  }

  if (act === "drop") {
    const found = addressed(rest, rows, now)
    if (typeof found === "string") return mistaking([found])
    const at = rows.indexOf(found)
    const before = at > 0 ? rows[at - 1] : undefined
    rows.splice(at, 1)
    if (rest.includes(MEND) && before !== undefined) {
      if (found.endTime === undefined) delete before.endTime
      else before.endTime = found.endTime
    }
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf(rows))
    return await landed(held, rows, `Drop ${found.title} on ${day}`, given)
  }

  if (act === "split") {
    const found = addressed(rest, rows, now)
    if (typeof found === "string") return mistaking([found])
    const said = saidFor(rest, AT)
    if (said === null) return mistaking([`${AT} names the time the stretch is parted at`])
    const reading = readMountainWallTime(said, now)
    if (reading.read === "refused") return mistaking([reading.saying])
    const parted = reading.at.getTime()
    const from = new Date(found.startTime).getTime()
    const to =
      found.endTime === undefined ? Number.POSITIVE_INFINITY : new Date(found.endTime).getTime()
    if (parted <= from || parted >= to) {
      return mistaking([`${said} falls outside the stretch this parts`])
    }
    const title = saidFor(rest, TITLE) ?? found.title
    const levels = levelsFor(rest, title, found, activities)
    if (levels.read === "refused") return mistaking(levels.refusals)
    const next: Row = {
      id: mintedAt(now),
      title,
      startTime: reading.iso,
      dailyTracking: held.page,
      ...levels.levels,
      ...taggingOf(taggedFor(stated, title, carriedIn(found), known)),
    }
    if (found.endTime !== undefined) next.endTime = found.endTime
    found.endTime = reading.iso
    rows.splice(rows.indexOf(found) + 1, 0, next)
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf([found, next]))
    return await landed(held, rows, `Split ${found.title} on ${day}`, given)
  }

  if (act === "close" || act === "switch") {
    const found = endingIn(given.root, day, held, rows, act)
    if (typeof found === "string") return mistaking([found])
    const ended = instantIn(rest, AT, now)
    if (ended === null) return mistaking([sayingFor(rest, AT, now)])
    if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
      return mistaking(["a stretch cannot end at or before it began"])
    }
    found.stretch.endTime = ended
    const woke =
      act === "switch" && sleeping(found.stretch.title) ? wokeInto(ended) : found.held.day
    const home = woke === found.held.day ? found : movedInto(given.root, found, ended)
    if (typeof home === "string") return mistaking([home])
    if (act === "switch") {
      const title = saidFor(rest, TITLE)
      if (title === null) return mistaking([`${TITLE} names what the next stretch is called`])
      const levels = levelsFor(rest, title, found.stretch, activities)
      if (levels.read === "refused") return mistaking(levels.refusals)
      home.rows.push({
        id: mintedAt(now),
        title,
        startTime: ended,
        dailyTracking: home.held.page,
        ...levels.levels,
        ...taggingOf(taggedFor(stated, title, [], known)),
      })
    }
    const landings = home === found ? [found] : [found, home]
    const faults = landings.flatMap((one) => faultsIn(one.rows, one.held.page))
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf(home.rows.slice(-2)))
    const doing = act === "switch" ? "Switch" : "Close"
    const said =
      home === found
        ? `${doing} on ${home.held.day}`
        : `${doing} on ${home.held.day}, and the sleep it ends opens that day`
    return await landedAcross(landings, said, given)
  }

  if (act === "open" || act === "log") {
    if (act === "open" && open !== null) {
      return mistaking(["this day carries an open stretch already, so nothing opens here"])
    }
    const title = saidFor(rest, TITLE)
    if (title === null) return mistaking([`${TITLE} names what the stretch is called`])
    const began = instantIn(rest, act === "open" ? AT : START, now)
    if (began === null) return mistaking([sayingFor(rest, act === "open" ? AT : START, now)])
    const levels = levelsFor(rest, title, rows[rows.length - 1] ?? null, activities)
    if (levels.read === "refused") return mistaking(levels.refusals)
    const one: Row = {
      id: mintedAt(now),
      title,
      startTime: began,
      dailyTracking: held.page,
      ...levels.levels,
      ...taggingOf(taggedFor(stated, title, [], known)),
    }
    if (act === "log") {
      const ended = saidFor(rest, END)
      if (ended === null) return mistaking([`${END} names the wall time the stretch ended`])
      const reading = readMountainWallTime(ended, now)
      if (reading.read === "refused") return mistaking([reading.saying])
      if (reading.at.getTime() <= new Date(began).getTime()) {
        return mistaking(["a stretch cannot end at or before it began"])
      }
      one.endTime = reading.iso
    }
    rows.push(one)
    rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    const faults = faultsIn(rows, held.page)
    if (faults.length > 0) return mistaking(faults)
    if (rest.includes(DRY_RUN)) return telling(shownOf([one]))
    return await landed(held, rows, `${act === "log" ? "Log" : "Open"} ${title} on ${day}`, given)
  }

  return refused(`\`${act}\` carries no act yet`, 1)
}
