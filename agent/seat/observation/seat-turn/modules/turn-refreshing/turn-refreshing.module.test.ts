import { expect, test } from "bun:test"
import { transcriptsAmong } from "akasha/agent/seat/observation/seat-turn/modules/turn-refreshing/turn-refreshing.module.code.ts"

const SEATS = [
  { path: "agent/seat/pages/athena/athena.seat.ts", id: "one" },
  { path: "agent/seat/pages/ember/ember.seat.ts", id: "two" },
  { path: "agent/seat/pages/nova/nova.seat.ts", id: "three" },
]

test("each seat stating a transcript is found at that transcript", () => {
  const found = transcriptsAmong(SEATS, (id) =>
    id === "one" ? { "transcript-path": "/t/athena.jsonl" } : id === "two" ? {} : null
  )
  expect([...found]).toEqual([["/t/athena.jsonl", { id: "one", slug: "athena" }]])
})

test("a seat whose values will not read is passed over", () => {
  const found = transcriptsAmong(SEATS, (id) => {
    if (id === "two") throw new Error("unreadable")
    return { "transcript-path": `/t/${id}.jsonl` }
  })
  expect([...found.keys()]).toEqual(["/t/one.jsonl", "/t/three.jsonl"])
})
