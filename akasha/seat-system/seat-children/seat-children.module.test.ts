import { expect, test } from "bun:test"
import type { Seated } from "@tools/lib/seat-roster"
import { childrenAmong } from "./seat-children.module.code.ts"

const seated = (id: string): Seated => ({ id }) as Seated

const UNDER: Readonly<Record<string, string | null>> = {
  "child-one": "parent",
  "child-two": "parent",
  orphan: null,
  "child-of-other": "another-parent",
}

const principalOf = (id: string): string | null => UNDER[id] ?? null

const among = [seated("child-one"), seated("child-two"), seated("orphan"), seated("child-of-other")]

test("a seat's children are the seats whose principal is that seat", () => {
  expect(childrenAmong("parent", among, principalOf).map((one) => one.id)).toEqual([
    "child-one",
    "child-two",
  ])
})

test("a seat standing under nobody is nobody's child", () => {
  expect(childrenAmong("orphan", among, principalOf)).toEqual([])
})

test("a child of another seat is not a child of this one", () => {
  expect(childrenAmong("another-parent", among, principalOf).map((one) => one.id)).toEqual([
    "child-of-other",
  ])
})

test("a seat nothing stands under has no children rather than all of them", () => {
  expect(childrenAmong("nobody-at-all", among, principalOf)).toEqual([])
})

test("no seat named reads as no children, and never as every seat", () => {
  expect(childrenAmong("", among, principalOf)).toEqual([])
})

test("an empty roster has no children in it", () => {
  expect(childrenAmong("parent", [], principalOf)).toEqual([])
})
