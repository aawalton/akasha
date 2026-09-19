import { expect, test } from "bun:test"
import {
  type Held,
  keptOf,
  ownValued,
} from "akasha/command/pages/music/fold-songs/music-fold-songs.command.code.ts"

function heldOf(slug: string, over: Partial<Held> = {}): Held {
  return { slug, path: `${slug}.song.ts`, own: false, base: false, ...over }
}

test("the page a person has written on is the page that stays", () => {
  const group = [heldOf("sia-alive", { base: true }), heldOf("sia-alive-3", { own: true })]
  expect(keptOf(group)?.slug).toBe("sia-alive-3")
})

test("where no page is written on, a page titled the composition stays", () => {
  const group = [heldOf("ariana-grande-34-35-remix"), heldOf("ariana-grande-34-35", { base: true })]
  expect(keptOf(group)?.slug).toBe("ariana-grande-34-35")
})

test("the shortest slug settles which of those stays", () => {
  const group = [
    heldOf("ariana-grande-hampstead-2", { base: true }),
    heldOf("ariana-grande-hampstead", { base: true }),
  ]
  expect(keptOf(group)?.slug).toBe("ariana-grande-hampstead")
})

test("a group titling no page the composition still keeps one of them", () => {
  const group = [heldOf("aurora-runaway-live"), heldOf("aurora-runaway-acoustic")]
  expect(keptOf(group)?.slug).toBe("aurora-runaway-live")
})

test("a group written on in more than one place is left alone", () => {
  const group = [heldOf("sia-alive", { own: true }), heldOf("sia-alive-3", { own: true })]
  expect(keptOf(group)).toBeNull()
})

test("a page is written on where it states what a person judged of it", () => {
  expect(ownValued({ title: "Alive", singability: "S-" })).toBe(true)
  expect(ownValued({ title: "Alive", insights: "txt" })).toBe(true)
  expect(ownValued({ title: "Alive", rank: "S" })).toBe(true)
  expect(ownValued({ title: "Alive", songType: "original", performed: true })).toBe(false)
})
