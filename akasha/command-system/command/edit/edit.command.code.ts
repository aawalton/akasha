import { join } from "node:path"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"
import type { Change } from "../../landing.module.code.ts"
import type { Held } from "../write/write.command.code.ts"
import {
  BREAK_GLASS,
  bytesAt,
  COMMITTING,
  DRY_RUN,
  defaultMessage,
  FILE_PATH,
  glassIn,
  landingAsked,
  MESSAGE,
  MESSAGE_FILE,
  messageIn,
  mistaking,
  outside,
  pathInside,
  textAt,
  textOf,
  troubling,
  unknownIn,
  unwarrantedIn,
} from "../write/write.command.code.ts"

const OLD_FILE = "--old-file"

const NEW_FILE = "--new-file"

const VALUED = [FILE_PATH, OLD_FILE, NEW_FILE, MESSAGE, MESSAGE_FILE, BREAK_GLASS]

const BARE = [DRY_RUN]

export const surface: Surface = {
  taking: [
    { said: `${FILE_PATH} <path>`, takes: "the file under `akasha/` to change" },
    { said: `${OLD_FILE} <file>`, takes: "a file holding the passage to replace" },
    { said: `${NEW_FILE} <file>`, takes: "a file holding what that passage becomes" },
    ...COMMITTING,
  ],
  notes: [
    `${FILE_PATH}, ${OLD_FILE} and ${NEW_FILE} repeat in triples, so several files change as one.`,
    "a passage stated must stand exactly once in the file, or the call is refused.",
    "the passage and what it becomes are files, never text said on the command line.",
  ],
}

type Stated = {
  readonly old: string
  readonly put: string
}

type Asking = {
  readonly path: string
  readonly stated: Stated[]
}

type Read = {
  readonly asking: readonly Asking[]
  readonly refusals: readonly string[]
}

function readIn(argv: readonly string[]): Read {
  const asking: Asking[] = []
  const refusals: string[] = []
  let open: Asking | null = null
  let old: string | null = null
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) continue
    if (token === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${FILE_PATH} takes a path, and none follows it`)
        break
      }
      if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
      if (open !== null) {
        if (open.stated.length === 0) {
          refusals.push(`${FILE_PATH} ${open.path} states no ${OLD_FILE}, so it asks for no change`)
        }
        asking.push(open)
      }
      open = { path: value, stated: [] }
      old = null
      at += 1
      continue
    }
    if (token === OLD_FILE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${OLD_FILE} takes a file, and none follows it`)
        break
      }
      if (open === null) refusals.push(`${OLD_FILE} ${value} follows no ${FILE_PATH}`)
      if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
      old = value
      at += 1
      continue
    }
    if (token === NEW_FILE) {
      const value = argv[at + 1]
      if (value === undefined) {
        refusals.push(`${NEW_FILE} takes a file, and none follows it`)
        break
      }
      if (old === null) refusals.push(`${NEW_FILE} ${value} follows no ${OLD_FILE}`)
      else if (open !== null) open.stated.push({ old, put: value })
      old = null
      at += 1
      continue
    }
    if (VALUED.includes(token)) at += 1
  }
  if (old !== null) refusals.push(`${OLD_FILE} ${old} is closed by no ${NEW_FILE}`)
  if (open !== null) {
    if (open.stated.length === 0) {
      refusals.push(`${FILE_PATH} ${open.path} states no ${OLD_FILE}, so it asks for no change`)
    }
    asking.push(open)
  }
  return { asking, refusals }
}

export function counted(body: string, said: string): number {
  let found = 0
  let at = body.indexOf(said)
  while (at !== -1) {
    found += 1
    at = body.indexOf(said, at + said.length)
  }
  return found
}

export function substituted(body: string, said: string, put: string): string {
  const at = body.indexOf(said)
  return body.slice(0, at) + put + body.slice(at + said.length)
}

type Worked = { readonly body: string } | { readonly mistaken: string } | { readonly wrong: string }

function working(path: string, body: string, stated: readonly Stated[]): Worked {
  let held = body
  for (const [which, one] of stated.entries()) {
    const said = textAt(one.old)
    if (said === null) return { mistaken: `${OLD_FILE} ${one.old} could not be read as text` }
    const put = textAt(one.put)
    if (put === null) return { mistaken: `${NEW_FILE} ${one.put} could not be read as text` }
    if (said === "") {
      return {
        mistaken: `${OLD_FILE} ${one.old} is empty, and an empty passage names no place in ${path}`,
      }
    }
    const found = counted(held, said)
    if (found !== 1) {
      const how = found === 0 ? "no passage" : `${found} passages`
      return {
        wrong: `${path} — substitution ${which + 1} matches ${how}, and one substitution names one passage`,
      }
    }
    held = substituted(held, said, put)
  }
  return { body: held }
}

export function edit(argv: readonly string[], given: Given): Answer {
  const unknown = unknownIn(argv, VALUED, BARE)
  if (unknown.length > 0) return mistaking(unknown)
  const read = readIn(argv)
  if (read.refusals.length > 0) return mistaking(read.refusals)
  if (read.asking.length === 0) {
    return mistaking([`this call names no ${FILE_PATH}, so it asks for no change at all`])
  }
  const glass = glassIn(argv, VALUED)
  if ("refusals" in glass) return mistaking(glass.refusals)
  const message = messageIn(argv, VALUED)
  if ("refusals" in message) return mistaking(message.refusals)

  const mistaken: string[] = []
  const wrong: string[] = []
  const changes: Change[] = []
  const unmoved: Held[] = []
  const seen = new Set<string>()
  for (const one of read.asking) {
    const path = pathInside(given.root, one.path)
    if (path === null) {
      mistaken.push(outside(one.path))
      continue
    }
    if (seen.has(path)) {
      mistaken.push(`${path} is named more than once by one call`)
      continue
    }
    seen.add(path)
    const was = bytesAt(join(given.root, path))
    if (was === null) {
      wrong.push(`${path} is not there — \`edit\` changes a file that is, and \`write\` makes one`)
      continue
    }
    const body = textOf(was)
    if (body === null) {
      wrong.push(`${path} is not text, so no substitution can be stated against it`)
      continue
    }
    const worked = working(path, body, one.stated)
    if ("mistaken" in worked) {
      mistaken.push(worked.mistaken)
      continue
    }
    if ("wrong" in worked) {
      wrong.push(worked.wrong)
      continue
    }
    changes.push({ path, body: new TextEncoder().encode(worked.body) })
    unmoved.push({ path, was })
  }
  wrong.push(...unwarrantedIn(given, glass.glass, changes))
  const troubled = troubling({ mistaken, wrong })
  if (troubled !== null) return troubled

  return landingAsked(given, {
    changes,
    message:
      message.message ??
      defaultMessage(
        "edit",
        changes.map((one) => one.path)
      ),
    dryRun: argv.includes(DRY_RUN),
    glass: glass.glass,
    unmoved,
    saying: (said) => said.wrote.map((one) => `edited ${one}`),
  })
}
