import { expect, test } from "bun:test"
import {
  asidesIn,
  trackTypeFor,
} from "akasha/alan/music/catalog/modules/track-typing/track-typing.module.code.ts"

test("a title saying nothing of itself is the studio recording", () => {
  expect(trackTypeFor("Fire and Ice")).toBe("studio")
  expect(trackTypeFor("ordinary things (feat. Nonna)")).toBe("studio")
})

test("a kind is read from a bracketed aside", () => {
  expect(trackTypeFor("Murder Song (5, 4, 3, 2, 1) (Acoustic)")).toBe("acoustic")
  expect(trackTypeFor("warning signs (instrumental)")).toBe("instrumental")
})

test("a kind is read from the tail after the first dash", () => {
  expect(trackTypeFor("Bang Bang - A Cappella")).toBe("a-cappella")
  expect(trackTypeFor("Angry Blues - 2019 Remaster")).toBe("remaster")
  expect(trackTypeFor("Memory Lane - Demo Version")).toBe("demo")
})

test("the tail runs to the end however many dashes follow", () => {
  expect(trackTypeFor("ilomilo - Live From The Film - A Little Blurry")).toBe("live")
  expect(trackTypeFor("Oceans - Live at E-Werk, Cologne")).toBe("live")
  expect(trackTypeFor("Alien - M-22 Remix")).toBe("remix")
})

test("a word outside an aside and outside that tail names no kind", () => {
  expect(trackTypeFor("Live To Love")).toBe("studio")
  expect(trackTypeFor("Concert Intro")).toBe("studio")
  expect(trackTypeFor("Charlie Brown Medley")).toBe("studio")
})

test("a live take of a remix is a remix", () => {
  expect(trackTypeFor("Bang Bang - 3LAU Remix (Live)")).toBe("remix")
})

test("a title naming no other kind but calling itself a version is a version", () => {
  expect(trackTypeFor("Santa Tell Me - Naughty Version")).toBe("version")
  expect(trackTypeFor("Feather - Sped Up")).toBe("version")
  expect(trackTypeFor("Defying Gravity - Edit")).toBe("version")
})

test("a medley and a reprise are pieces of their own", () => {
  expect(trackTypeFor("I'm Not That Girl (Reprise)")).toBe("studio")
  expect(trackTypeFor("Cello Wars (Medley)")).toBe("studio")
})

test("every aside is read, and the tail beside them", () => {
  expect(asidesIn("Bang Bang (feat. Nicki) - 3LAU Remix")).toEqual(["feat. Nicki", "3LAU Remix"])
  expect(asidesIn("Fire and Ice")).toEqual([])
})
