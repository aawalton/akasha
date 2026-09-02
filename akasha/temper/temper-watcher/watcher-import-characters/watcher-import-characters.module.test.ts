import { expect, test } from "bun:test"
import type { SignedInReader } from "../watcher-signed-in-user/watcher-signed-in-user.module.code.ts"
import type { PageUpsert } from "./watcher-import-characters.module.code.ts"
import {
  executeCharacterImportPlan,
  keepKnownSkillLineIds,
  padEveryTree,
  padSlottedStars,
  parseCharacterSavedVariables,
  planCharacterImport,
  runImportCharacters,
} from "./watcher-import-characters.module.code.ts"

const REAL_HASH =
  "ATQHgAAAAABgAAf__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALG0AAAAAAAAAKAAAAAAAAyA"

function savedVariables(characters: string): string {
  return `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@alan"] =
        {
            ["$AccountWide"] =
            {
                ["characters"] =
                {
${characters}
                },
            },
        },
    },
}
`
}

const TWO_CHARACTERS = savedVariables(`                    ["12345"] =
                    {
                        ["name"] = "Shalidor",
                        ["buildHash"] = "not-a-real-hash",
                    },
                    ["67890"] =
                    {
                        ["buildHash"] = "another-bad-hash",
                    },
                    ["11111"] =
                    {
                        ["name"] = "NoHash",
                    },`)

const ONE_REAL_CHARACTER = savedVariables(`                    ["12345"] =
                    {
                        ["name"] = "Shalidor",
                        ["buildHash"] = "${REAL_HASH}",
                    },
                    ["67890"] =
                    {
                        ["buildHash"] = "bogus",
                    },`)

function recording(id: unknown): { upsert: PageUpsert; seen: unknown[] } {
  const seen: unknown[] = []
  const upsert = (async (args: unknown) => {
    seen.push(args)
    return { id } as never
  }) as PageUpsert
  return { upsert, seen }
}

function reporting(): { report: (line: string) => void; lines: string[] } {
  const lines: string[] = []
  return { report: (line: string) => void lines.push(line), lines }
}

const NO_SUPABASE: SignedInReader = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: { message: "no session" } }),
  },
}

test("a character carrying a build hash is read out, and one carrying none is left out", () => {
  expect(parseCharacterSavedVariables(TWO_CHARACTERS)).toEqual([
    { esoCharacterId: "12345", characterName: "Shalidor", buildHash: "not-a-real-hash" },
    { esoCharacterId: "67890", characterName: "Character 67890", buildHash: "another-bad-hash" },
  ])
})

test("an account holding no account-wide table is skipped for the next account key", () => {
  const twoAccounts = TWO_CHARACTERS.replace(
    '["@alan"]',
    `["@empty"]
        =
        {
        },
        ["@alan"]`
  )
  expect(parseCharacterSavedVariables(twoAccounts)).toEqual(
    parseCharacterSavedVariables(TWO_CHARACTERS)
  )
})

test("a file holding no Default table is refused", () => {
  expect(() => parseCharacterSavedVariables("TemperCharacters_SavedVariables =\n{\n}\n")).toThrow(
    "Missing Default table in saved variables"
  )
})

test("a Default table holding no at-sign account is refused", () => {
  const noAccount = `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["nope"] =
        {
        },
    },
}
`
  expect(() => parseCharacterSavedVariables(noAccount)).toThrow(
    "Could not find $AccountWide in saved variables"
  )
})

test("slotted stars are filled to four with the no-star of their own tree", () => {
  expect(padSlottedStars([], "warfare")).toEqual([
    "no-warfare-star",
    "no-warfare-star",
    "no-warfare-star",
    "no-warfare-star",
  ])
  expect(padSlottedStars(["fighting-finesse"], "fitness")).toEqual([
    "fighting-finesse",
    "no-fitness-star",
    "no-fitness-star",
    "no-fitness-star",
  ])
  expect(padSlottedStars([], "craft")).toEqual([
    "no-craft-star",
    "no-craft-star",
    "no-craft-star",
    "no-craft-star",
  ])
})

test("a tree already holding more than four slotted stars is left alone", () => {
  const over = ["backstabber", "ironclad", "resilience", "reinforced", "riposte"] as const
  expect(padSlottedStars(over, "warfare")).toEqual([...over])
})

test("every tree is filled to four and what a tree already holds is kept", () => {
  expect(
    padEveryTree({
      warfare: { passive: ["fighting-finesse"], slotted: [] },
      fitness: { passive: [], slotted: ["no-fitness-star"] },
      craft: { passive: [], slotted: [] },
    })
  ).toEqual({
    warfare: {
      passive: ["fighting-finesse"],
      slotted: ["no-warfare-star", "no-warfare-star", "no-warfare-star", "no-warfare-star"],
    },
    fitness: {
      passive: [],
      slotted: ["no-fitness-star", "no-fitness-star", "no-fitness-star", "no-fitness-star"],
    },
    craft: {
      passive: [],
      slotted: ["no-craft-star", "no-craft-star", "no-craft-star", "no-craft-star"],
    },
  })
})

test("a skill line the catalog does not name is dropped and the rest keep their order", () => {
  expect(
    keepKnownSkillLineIds(["no-skill-line", "nope" as never, "dragonknight-ardent-flame"])
  ).toEqual(["no-skill-line", "dragonknight-ardent-flame"])
})

test("a build hash that will not decode is skipped and the rest are still planned", () => {
  expect(planCharacterImport(ONE_REAL_CHARACTER)).toEqual({
    actions: [
      {
        action: "upsert",
        characterName: "Shalidor",
        esoCharacterId: "12345",
        canonicalHash: REAL_HASH,
      },
      {
        action: "skip",
        characterName: "Character 67890",
        reason: 'failed to decode hash "bogus"',
      },
    ],
  })
})

test("every character of a file of undecodable hashes is skipped", () => {
  expect(planCharacterImport(TWO_CHARACTERS)).toEqual({
    actions: [
      {
        action: "skip",
        characterName: "Shalidor",
        reason: 'failed to decode hash "not-a-real-hash"',
      },
      {
        action: "skip",
        characterName: "Character 67890",
        reason: 'failed to decode hash "another-bad-hash"',
      },
    ],
  })
})

test("a plan holding no action upserts nothing and reports nothing", async () => {
  const { upsert, seen } = recording("page-1")
  const { report, lines } = reporting()
  await executeCharacterImportPlan({ actions: [] }, NO_SUPABASE, {}, { upsert, report })
  expect(seen).toEqual([])
  expect(lines).toEqual([])
})

test("the account page is upserted before any character page", async () => {
  const { upsert, seen } = recording("page-1")
  const { report } = reporting()
  await runImportCharacters(
    ONE_REAL_CHARACTER,
    NO_SUPABASE,
    { userId: "@alan" },
    { upsert, report }
  )
  expect(seen).toEqual([
    {
      pageTypeSlug: "temper-account",
      where: [{ key: "title", eq: "@alan" }],
      set: { userId: "@alan", title: "@alan" },
      select: ["id"],
    },
    {
      pageTypeSlug: "temper-account-character",
      where: [
        { key: "accountPage", eq: "@alan" },
        { key: "esoCharacterId", eq: "12345" },
      ],
      set: {
        userId: "@alan",
        accountPage: "@alan",
        esoCharacterId: "12345",
        title: "Shalidor",
      },
      select: ["id"],
    },
  ])
})

test("what is reported names the count, each skip, each capture, and the summary", async () => {
  const { upsert } = recording("page-1")
  const { report, lines } = reporting()
  await runImportCharacters(
    ONE_REAL_CHARACTER,
    NO_SUPABASE,
    { userId: "@alan" },
    { upsert, report }
  )
  expect(lines).toEqual([
    "Found 2 character(s).\n",
    '  Character 67890: failed to decode hash "bogus", skipping',
    `  Shalidor: captured hash ${REAL_HASH}`,
    "\n=== Summary ===",
    "  Captured: 1",
    "  Skipped:  1",
  ])
})

test("a run skipping nothing reports no skipped line", async () => {
  const { upsert } = recording("page-1")
  const { report, lines } = reporting()
  const onlyGood = savedVariables(`                    ["12345"] =
                    {
                        ["name"] = "Shalidor",
                        ["buildHash"] = "${REAL_HASH}",
                    },`)
  await runImportCharacters(onlyGood, NO_SUPABASE, { userId: "@alan" }, { upsert, report })
  expect(lines).toEqual([
    "Found 1 character(s).\n",
    `  Shalidor: captured hash ${REAL_HASH}`,
    "\n=== Summary ===",
    "  Captured: 1",
  ])
})

test("a run given no user asks the client, and the refusal names what is missing", async () => {
  const { upsert } = recording("page-1")
  const { report } = reporting()
  await expect(
    runImportCharacters(ONE_REAL_CHARACTER, NO_SUPABASE, {}, { upsert, report })
  ).rejects.toThrow("no signed-in user to import these characters (no session)")
})

test("an account page that comes back with no id stops the import", async () => {
  const { upsert } = recording(undefined)
  const { report } = reporting()
  await expect(
    runImportCharacters(ONE_REAL_CHARACTER, NO_SUPABASE, { userId: "@alan" }, { upsert, report })
  ).rejects.toThrow("the temper-account page for @alan came back with no id")
})
