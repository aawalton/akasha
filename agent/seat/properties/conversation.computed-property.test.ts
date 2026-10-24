import { expect, test } from "bun:test"
import {
  ENTRIES_AFTER_COMPACTION,
  TRANSCRIPT,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.test-fixtures.ts"
import { work } from "akasha/agent/seat/properties/conversation.computed-property.code.ts"
import type { Reach } from "akasha/page/computed-property/computed-property.page-type.ts"
import { jenny } from "akasha/person/pages/jenny/jenny.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const PATH = "/transcripts/seat.jsonl"

const BYTES = new TextEncoder().encode(TRANSCRIPT)

const REACH: Reach = {
  target: () => null,
  through: () => null,
  naming: () => [],
  file: (path) =>
    path === PATH ? { size: BYTES.length, read: (from, upTo) => BYTES.slice(from, upTo) } : null,
  folder: () => null,
}

test("a seat's conversation is read from the transcript its path names", () => {
  expect(work({ transcriptPath: PATH }, REACH)).toEqual(ENTRIES_AFTER_COMPACTION)
})

test("a seat naming no transcript has no conversation", () => {
  expect(work({}, REACH)).toBeNull()
})

test("a seat naming a transcript that is not there has no conversation", () => {
  expect(work({ transcriptPath: "/transcripts/gone.jsonl" }, REACH)).toBeNull()
})

function channeled(sender: string): string {
  const said = `<channel source="messages" sender="${sender}" message_id="m">\nhi\n</channel>`
  return `${JSON.stringify({ type: "user", timestamp: "t", message: { content: said } })}\n`
}

test("a sender is a person where a person page has the sender's slug", () => {
  const bytes = new TextEncoder().encode(`${channeled(jenny.slug)}${channeled("thea")}`)
  const reach: Reach = {
    ...REACH,
    target: <Held>(slug: string) => (slug === `${person.slug}/${jenny.slug}` ? ({} as Held) : null),
    file: () => ({ size: bytes.length, read: (from, upTo) => bytes.slice(from, upTo) }),
  }
  expect(work({ transcriptPath: PATH }, reach)).toEqual([
    { kind: "person", sender: jenny.slug, text: "hi", images: 0, at: "t", message: "m" },
    { kind: "message", sender: "thea", text: "hi", at: "t" },
  ])
})
