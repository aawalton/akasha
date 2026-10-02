import { afterAll, expect, test } from "bun:test"
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { stepBeats } from "akasha/story/chapter/properties/step-beats.text-property.ts"
import { lore } from "akasha/story/lore/lore.page-type.ts"
import { loreFact } from "akasha/story/lore/properties/lore-fact.text-property.ts"
import { loreFacts } from "akasha/story/lore/properties/lore-facts.record-property.ts"
import { loreKnowers } from "akasha/story/lore/properties/lore-knowers.multi-relation-property.ts"
import { loreDisclosure } from "akasha/story/lore-disclosure/lore-disclosure.page-type.ts"
import {
  heldIn,
  heldNotice,
  LEFT_OUT,
  SCRUBBED_BY,
  type Scrubber,
  scrubbedAbove,
  scrubbedRun,
  scrubberFor,
  scrubbing,
  tellsIn,
} from "akasha/story/lore-disclosure/modules/lore-scrubbing/lore-scrubbing.module.code.ts"
import { ASKED } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
  RECORDER_SEAT,
  UNDER_GAME_MASTER,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"
import { gameMaster } from "akasha/story/lore-disclosure/pages/game-master.lore-disclosure.ts"
import { prose } from "akasha/story/world/stories/played/properties/prose.file-property.ts"
import { turnAction } from "akasha/story/world/stories/played/turns/properties/turn-action.text-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const FACT = "The ferryman remembers every crossing the river has forgotten"

const SECOND = "Seven lanterns burn beneath the northern tide"

const SHORT = "the drowned bell tolls"

const BODY = [
  'import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"',
  "",
  "export const sealed = {",
  '  id: "01a0d600-0000-7000-8000-000000000003",',
  '  type: "page-type/lore",',
  '  slug: "sealed",',
  '  title: "Sealed",',
  `  facts: ["${FACT}", "${SECOND}", "${SHORT}"],`,
  "} as const satisfies Lore",
  "",
].join("\n")

function sealedWorld(): string {
  const root = loreWorld(scratch)
  const at = join(root, LORE_AT)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, BODY)
  return root
}

function scrubberOf(root: string): Scrubber {
  const found = scrubberFor(root, GAME_MASTER_SEAT)
  if (found === null) throw new Error("a game master's seat was given no scrubber")
  return found
}

test("the prose a withheld page states is what is looked for, and no id, type or slug", () => {
  expect(tellsIn(BODY)).toEqual([FACT, SECOND, SHORT])
})

test("a withheld file gone by the time it is read lends nothing and breaks nothing", () => {
  const root = sealedWorld()
  rmSync(join(root, LORE_AT))
  expect(() => scrubberFor(root, GAME_MASTER_SEAT)).not.toThrow()
})

test("a seat of another role is scrubbed nothing", () => {
  expect(scrubberFor(sealedWorld(), OTHER_SEAT)).toBeNull()
  expect(scrubberFor(sealedWorld(), null)).toBeNull()
})

test("a subagent under a game master's seat is scrubbed as the seat is", () => {
  expect(scrubberFor(sealedWorld(), UNDER_GAME_MASTER)).not.toBeNull()
})

test("a story recorder's seat, and a subagent under it, are scrubbed as a game master's", () => {
  const root = sealedWorld()
  const found = scrubberFor(root, RECORDER_SEAT)
  expect(found).not.toBeNull()
  if (found !== null) expect(heldIn(`"${FACT}"`, found)).toBe(true)
  expect(scrubberFor(root, `${RECORDER_SEAT}--held-sub`)).not.toBeNull()
})

test("a line carrying a withheld fact, as a diff or a draft shows it, is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`+    "${FACT}",`, scrubber)).toBe(true)
  expect(heldIn(`  facts: ["${SECOND}"]`, scrubber)).toBe(true)
})

test("a fact escaped into a transcript's JSON is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  const line = JSON.stringify({ content: `     8\t  facts: ["${FACT}"],\n` })
  expect(heldIn(line, scrubber)).toBe(true)
})

test("a fact cut short past five of its words is held", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`${FACT.slice(0, 40)}… (38 more characters)`, scrubber)).toBe(true)
})

test("a short fact is held where it is whole, whatever its case", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(`said: ${SHORT.toUpperCase()}!`, scrubber)).toBe(true)
  expect(heldIn("the drowned bell", scrubber)).toBe(false)
})

test("a line naming the withheld page's path, or none of its prose, is kept", () => {
  const scrubber = scrubberOf(sealedWorld())
  expect(heldIn(LORE_AT, scrubber)).toBe(false)
  expect(heldIn("the ferryman crossed the river at dawn", scrubber)).toBe(false)
})

test("a file path lends no words, so a told page's path sharing withheld prose is kept", () => {
  const scrubber = scrubberOf(sealedWorld())
  const at = "story/world/pages/held/places/held-the-drowned-bell-tolls.place.ts"
  expect(heldIn(`${at} — the whole file follows, 12 lines`, scrubber)).toBe(false)
  expect(heldIn(`  ${at}`, scrubber)).toBe(false)
  expect(heldIn(`at ${at}: the drowned bell tolls`, scrubber)).toBe(true)
  expect(heldIn('place: "place/the-drowned-bell-tolls"', scrubber)).toBe(true)
})

const OPEN_AT = "story/world/pages/held/lore/open.lore.ts"

const TOLD = "The ferryman remembers every crossing he has made"

const UNTOLD = "Seven lanterns burn beneath the old stone bridge"

function toldWorld(): string {
  const root = sealedWorld()
  const toGameMaster = [`${loreDisclosure.slug}/${gameMaster.slug}`]
  valueAlsoFiled(root, lore.slug, [
    {
      path: OPEN_AT,
      value: {
        id: "01a0d600-0000-7000-8000-00000000000a",
        type: `page-type/${lore.slug}`,
        slug: "open",
        [loreFacts.propertySlug]: [
          { [loreFact.propertySlug]: TOLD, [loreKnowers.propertySlug]: toGameMaster },
          {
            [loreFact.propertySlug]: UNTOLD,
            [loreKnowers.propertySlug]: ["character-player/held"],
          },
        ],
      },
    },
  ])
  return root
}

test("a fact told to the game master is kept where it shares words with a withheld fact", () => {
  const scrubber = scrubberOf(toldWorld())
  expect(heldIn(`      fact: "${TOLD}",`, scrubber)).toBe(false)
  expect(heldIn(`"${FACT}"`, scrubber)).toBe(true)
})

const PLAYED_AT =
  "story/world/pages/held/stories/played/held/turns/held-00-001.story-turn-played.ts"

const ACTION = "I tell her the ferryman remembers every crossing, so she should ask him"

const QUOTING = 'Alan: "The ferryman remembers every crossing."'

const OWN = "Seven lanterns burn beneath the pier as she listens."

const PROSE = "She had heard of every crossing the river has ever carried."

function playedWorld(): string {
  const root = sealedWorld()
  valueAlsoFiled(root, storyTurnPlayed.slug, [
    {
      path: PLAYED_AT,
      value: {
        id: "01a0d600-0000-7000-8000-00000000000b",
        type: `page-type/${storyTurnPlayed.slug}`,
        slug: "held-00-001",
        [turnAction.propertySlug]: ACTION,
        [stepBeats.propertySlug]: [QUOTING, OWN],
        [prose.propertySlug]: "txt",
      },
    },
  ])
  const written = join(root, PLAYED_AT.replace(/\.ts$/, ".prose.txt"))
  mkdirSync(dirname(written), { recursive: true })
  writeFileSync(written, `${PROSE}\n`)
  return root
}

test("a player's action is kept where it shares words with a withheld fact", () => {
  const scrubber = scrubberOf(playedWorld())
  expect(heldIn(`  action: ${JSON.stringify(ACTION)},`, scrubber)).toBe(false)
  expect(heldIn(`"${FACT}"`, scrubber)).toBe(true)
})

test("a played turn's prose is kept, and the withheld fact it echoes is still held", () => {
  const scrubber = scrubberOf(playedWorld())
  expect(heldIn(`1\t${PROSE}`, scrubber)).toBe(false)
  expect(heldIn(`"${FACT}"`, scrubber)).toBe(true)
})

test("a beat quoting the player is kept where it shares words with a withheld fact", () => {
  const scrubber = scrubberOf(playedWorld())
  expect(heldIn(`    ${JSON.stringify(QUOTING)},`, scrubber)).toBe(false)
})

test("a beat the game master wrote is kept, and the withheld fact it echoes is still held", () => {
  const scrubber = scrubberOf(playedWorld())
  expect(heldIn(`    ${JSON.stringify(OWN)},`, scrubber)).toBe(false)
  expect(heldIn(`"${SECOND}"`, scrubber)).toBe(true)
})

const CHAPTER_AT =
  "story/world/pages/held/stories/written/held/chapters/held-0001.story-chapter-written.ts"

const CHAPTER_BEAT = "Seven lanterns burn beneath the eaves of the inn tonight."

const CHAPTER_PROSE = "The ferryman remembers every crossing he ever rowed for her."

function writtenWorld(): string {
  const root = sealedWorld()
  valueAlsoFiled(root, storyChapterWritten.slug, [
    {
      path: CHAPTER_AT,
      value: {
        id: "01a0d600-0000-7000-8000-00000000000c",
        type: `page-type/${storyChapterWritten.slug}`,
        slug: "held-0001",
        [stepBeats.propertySlug]: [CHAPTER_BEAT],
        [prose.propertySlug]: "txt",
      },
    },
  ])
  const written = join(root, CHAPTER_AT.replace(/\.ts$/, ".prose.txt"))
  mkdirSync(dirname(written), { recursive: true })
  writeFileSync(written, `${CHAPTER_PROSE}\n`)
  return root
}

test("a written chapter's beat is kept, and the withheld fact it echoes is still held", () => {
  const scrubber = scrubberOf(writtenWorld())
  expect(heldIn(`    ${JSON.stringify(CHAPTER_BEAT)},`, scrubber)).toBe(false)
  expect(heldIn(`"${SECOND}"`, scrubber)).toBe(true)
})

test("a written chapter's prose is kept, and the withheld fact it echoes is still held", () => {
  const scrubber = scrubberOf(writtenWorld())
  expect(heldIn(`1\t${CHAPTER_PROSE}`, scrubber)).toBe(false)
  expect(heldIn(`"${FACT}"`, scrubber)).toBe(true)
})

test("a fact told to no game master lends no withheld words back", () => {
  const scrubber = scrubberOf(toldWorld())
  expect(heldIn(UNTOLD, scrubber)).toBe(true)
})

test("a stream split mid-line is judged by whole lines and keeps its last line's ending", () => {
  const scrubber = scrubberOf(sealedWorld())
  const written: string[] = []
  const stream = scrubbing(scrubber, (text) => written.push(text))
  stream.chunk("kept one\nThe ferryman remembers ev")
  stream.chunk("ery crossing the river has forgotten\nkept two")
  expect(stream.end()).toBe(1)
  expect(written.join("")).toBe(`kept one\n${LEFT_OUT}\nkept two`)
})

test("the notice says how many lines were left out and names nothing from the page", () => {
  const said = heldNotice(2)
  expect(said).toContain("2 lines")
  expect(said).toContain(ASKED)
  expect(said).not.toContain(LORE_AT)
  expect(said).not.toContain("ferryman")
})

test("the notice is true of a reviewer, a writer and a recorder as of a game master", () => {
  const said = heldNotice(1)
  expect(said).toContain("1 line this call printed carries")
  expect(said).not.toContain("game master's")
})

test("a program run under the scrubber prints no withheld fact and keeps its exit code", async () => {
  const scrubber = scrubberOf(sealedWorld())
  const out: string[] = []
  const err: string[] = []
  const program = `console.log(${JSON.stringify(FACT)}); console.log("kept"); process.exit(3)`
  const code = await scrubbedRun([process.execPath, "-e", program], scrubber, {
    out: (text) => out.push(text),
    err: (text) => err.push(text),
  })
  expect(code).toBe(3)
  expect(out.join("")).toBe(`${LEFT_OUT}\nkept\n`)
  expect(err.join("")).toContain(ASKED)
})

test("a program run under the scrubber is told the process scrubbing it", async () => {
  const scrubber = scrubberOf(sealedWorld())
  const out: string[] = []
  const program = `console.log(process.env.${SCRUBBED_BY} === String(process.ppid))`
  await scrubbedRun([process.execPath, "-e", program], scrubber, {
    out: (text) => out.push(text),
    err: () => undefined,
  })
  expect(out.join("")).toBe("true\n")
})

test("a call is scrubbed above only where the process above it says it scrubs", () => {
  expect(scrubbedAbove({ [SCRUBBED_BY]: "4242" }, 4242)).toBe(true)
  expect(scrubbedAbove({ [SCRUBBED_BY]: "4242" }, 4243)).toBe(false)
  expect(scrubbedAbove({}, 4242)).toBe(false)
})
