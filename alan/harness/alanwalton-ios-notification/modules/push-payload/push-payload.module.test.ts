import { expect, test } from "bun:test"
import {
  buildApnsPayload,
  notificationRoute,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/push-payload/push-payload.module.code.ts"

const FEED = { slug: "alan", id: "01a06861-0000-7000-8000-00000000abcd" }

test("a notification stating a link deep-links there", () => {
  expect(notificationRoute("/story-played/the-dating-game-e09c8244", FEED)).toBe(
    "/story-played/the-dating-game-e09c8244"
  )
})

test("a notification stating no link deep-links to its feed", () => {
  expect(notificationRoute(null, FEED)).toBe("/notification-feed/alan-0000abcd")
  expect(notificationRoute("", FEED)).toBe("/notification-feed/alan-0000abcd")
})

test("the route rides outside aps, where a tap reads it", () => {
  const payload = buildApnsPayload({
    title: "The Dating Game",
    body: "Turn 3 is ready.",
    route: "/a",
  })
  expect(payload).toEqual({
    aps: { alert: { title: "The Dating Game", body: "Turn 3 is ready." }, sound: "default" },
    path: "/a",
  })
})
