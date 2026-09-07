import { expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { spelledPathStays } from "./spelled-path-stays.code-check.code.ts"

const ROOT = "/repo"

const HELD = "export const one = 1\n"

type Made = {
  readonly change: Change
  readonly shadow: Shadow
  readonly read: readonly string[]
  readonly walked: () => number
}

function worldOf(
  base: Readonly<Record<string, string>>,
  over: Readonly<Record<string, string | null>>
): Made {
  const read: string[] = []
  let walked = 0
  const before = (path: string): Uint8Array | null => {
    read.push(path)
    const found = base[path]
    return found === undefined ? null : new TextEncoder().encode(found)
  }
  const after = (path: string): Uint8Array | null => {
    read.push(path)
    if (Object.hasOwn(over, path)) {
      const said = over[path]
      return said === undefined || said === null ? null : new TextEncoder().encode(said)
    }
    return before(path)
  }
  const change: Change = { root: ROOT, changed: Object.keys(over).sort(), before, after }
  const index = {
    everyPath: () => {
      walked += 1
      return Object.keys(base).sort()
    },
  }
  const shadow: Shadow = { index } as never
  return { change, shadow, read, walked: () => walked }
}

function refusalsIn(
  base: Readonly<Record<string, string>>,
  over: Readonly<Record<string, string | null>>
): readonly string[] {
  const made = worldOf(base, over)
  return spelledPathStays(made.change, made.shadow).map((one) => `${one.path}: ${one.reason}`)
}

const SECRET_AT = "person-system/device-secrets/pages/one.device-secret.ts"

const SECRET_MOVED = "persons/device-secrets/pages/one.device-secret.ts"

const KEEPING_AT = "person-system/device-secret-keeping/device-secret-keeping.module.code.ts"

test("a path a literal spells, taken away by the change, is refused", () => {
  const said = refusalsIn(
    {
      [SECRET_AT]: HELD,
      [KEEPING_AT]: 'export const F = "person-system/device-secrets/pages"\n',
    },
    { [SECRET_AT]: null, [SECRET_MOVED]: HELD }
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(KEEPING_AT)
  expect(said[0]).toContain("person-system/device-secrets/pages")
  expect(said[0]).toContain("line 1")
})

const PEOPLE_AT = "person-system/people/pages/alan.person.ts"

const PEOPLE_MOVED = "persons/people/pages/alan.person.ts"

const PRESENT_AT = "seat-system/terminal-init/document-present/document-present.module.code.ts"

const HELP_AT = "seat-system/seat-start-help/seat-start-help.module.code.ts"

const KEEPING =
  'export const DEVICE_SECRETS_FOLDER = "person-system/device-secrets/pages"\n' +
  "\nexport function deviceSecretPath(slug: string): string {\n" +
  "  return `${DEVICE_SECRETS_FOLDER}/${slug}.device-secret.ts`\n}\n"

test("a bare constant naming a folder that moved is refused", () => {
  const said = refusalsIn(
    { [SECRET_AT]: HELD, [KEEPING_AT]: KEEPING },
    { [SECRET_AT]: null, [SECRET_MOVED]: HELD }
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("person-system/device-secrets/pages")
})

const FALLBACK =
  'export const SLUG_MARK = "<slug>"\n\n' +
  "export const PERSON_FALLBACK = `person-system/people/pages/${SLUG_MARK}.person.ts`\n"

test("a template whose head names a folder that moved is refused", () => {
  const said = refusalsIn(
    { [PEOPLE_AT]: HELD, [PRESENT_AT]: FALLBACK },
    { [PEOPLE_AT]: null, [PEOPLE_MOVED]: HELD }
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("person-system/people/pages")
  expect(said[0]).toContain("line 3")
})

const HELP =
  "export const HELP = {\n  description:\n" +
  '    "Who this seat is produced for — a person a page under `person-system/` answers to, or' +
  ' `agent` where it works for the fleet.",\n}\n'

test("a folder spelled inside a sentence is refused where that folder moved", () => {
  const said = refusalsIn(
    { [PEOPLE_AT]: HELD, [HELP_AT]: HELP },
    { [PEOPLE_AT]: null, [PEOPLE_MOVED]: HELD }
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("person-system")
})

test("a path written with the repository folder in front of it is refused all the same", () => {
  const said = refusalsIn(
    { [PEOPLE_AT]: HELD, [PRESENT_AT]: 'export const AT = "akasha/person-system/people/pages"\n' },
    { [PEOPLE_AT]: null, [PEOPLE_MOVED]: HELD }
  )
  expect(said).toHaveLength(1)
})

const PACKAGE_AT = "code-system/code-system.workspace-package.ts"

const READING_AT = "checks/modules/audit-reading/audit-reading.module.code.ts"

const REFERENCE = 'export const NAMED = "workspace-package/code-system"\n'

const APART_AT = "story/held/one.module.code.ts"

test("a page reference is let through where nothing it might name is touched", () => {
  expect(
    refusalsIn(
      { [PACKAGE_AT]: HELD, [READING_AT]: REFERENCE },
      { [READING_AT]: `${REFERENCE}export const two = 2\n` }
    )
  ).toEqual([])
})

test("a page reference is let through where an unrelated path goes", () => {
  expect(
    refusalsIn(
      { [PACKAGE_AT]: HELD, [READING_AT]: REFERENCE, [APART_AT]: HELD },
      { [APART_AT]: null }
    )
  ).toEqual([])
})

test("a path no file was ever at is let through", () => {
  expect(
    refusalsIn(
      { [READING_AT]: 'export const AT = "pages/domain/held.domain.ts"\n', [APART_AT]: HELD },
      { [APART_AT]: null }
    )
  ).toEqual([])
})

const TEXT_AT = "text/text-holding/text-holding.module.code.ts"

const STREAMING_AT = "web-page-answers/streaming/streaming.module.code.ts"

test("a media type is let through where a folder of that first name goes", () => {
  expect(
    refusalsIn(
      { [TEXT_AT]: HELD, [STREAMING_AT]: 'export const KIND = "text/event-stream"\n' },
      { [TEXT_AT]: null }
    )
  ).toEqual([])
})

const DATA_AT = "data/held/one.module.code.ts"

const PROSE_AT = "checks/modules/judging/judging.module.code.ts"

const PROSE =
  'export const SAID = "A check is handed the data the change carries, and reads no more."\n'

test("prose carrying the name of a folder that goes is let through", () => {
  expect(refusalsIn({ [DATA_AT]: HELD, [PROSE_AT]: PROSE }, { [DATA_AT]: null })).toEqual([])
})

test("a path under that same folder is refused, so the arm is not blind", () => {
  const said = refusalsIn(
    { [DATA_AT]: HELD, [PROSE_AT]: `${PROSE}export const AT = "data/held/one.module.code.ts"\n` },
    { [DATA_AT]: null }
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("data/held/one.module.code.ts")
})

test("a change taking nothing away reads no body beyond what it was handed", () => {
  const made = worldOf(
    { [SECRET_AT]: HELD, [KEEPING_AT]: KEEPING },
    { [KEEPING_AT]: `${KEEPING}export const two = 2\n` }
  )
  expect(spelledPathStays(made.change, made.shadow)).toEqual([])
  expect([...new Set(made.read)]).toEqual([KEEPING_AT])
  expect(made.walked()).toBe(0)
})

test("a file the change itself repairs is not refused for what it no longer says", () => {
  expect(
    refusalsIn(
      { [SECRET_AT]: HELD, [KEEPING_AT]: KEEPING },
      {
        [SECRET_AT]: null,
        [SECRET_MOVED]: HELD,
        [KEEPING_AT]: KEEPING.replace("person-system/", "persons/"),
      }
    )
  ).toEqual([])
})

test("a file the change takes away is not read for the paths it spelled", () => {
  expect(
    refusalsIn(
      { [SECRET_AT]: HELD, [KEEPING_AT]: KEEPING },
      { [SECRET_AT]: null, [KEEPING_AT]: null }
    )
  ).toEqual([])
})

test("every file spelling the path is named, not the first alone", () => {
  const said = refusalsIn(
    { [SECRET_AT]: HELD, [KEEPING_AT]: KEEPING, [READING_AT]: KEEPING },
    { [SECRET_AT]: null, [SECRET_MOVED]: HELD }
  )
  expect(said).toHaveLength(2)
})

test("a file that is not TypeScript is passed over", () => {
  expect(
    refusalsIn(
      { [SECRET_AT]: HELD, "notes/held.md": 'see "person-system/device-secrets/pages"\n' },
      { [SECRET_AT]: null }
    )
  ).toEqual([])
})
