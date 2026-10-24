import { expect, test } from "bun:test"
import {
  apnsPayloadFor,
  buildApnsPayload,
  notificationRoute,
  recipientsFor,
} from "akasha/alan/harness/alanwalton-ios-notification/modules/push-payload/push-payload.module.code.ts"
import {
  ALANWALTON_PUSH_APP,
  SMILINGJENNY_PUSH_APP,
} from "akasha/person/modules/push-apps/push-apps.module.code.ts"

const FEED = { slug: "alan", id: "01a06861-0000-7000-8000-00000000abcd" }

const ALAN = {
  userId: ALANWALTON_PUSH_APP.userId,
  bundleId: ALANWALTON_PUSH_APP.bundleId,
  routesTaps: true,
}

const JENNY = {
  userId: SMILINGJENNY_PUSH_APP.userId,
  bundleId: SMILINGJENNY_PUSH_APP.bundleId,
  routesTaps: false,
}

test("a notification reaches its owner through the owner's own app", () => {
  expect(recipientsFor({ ownerUserId: ALAN.userId, kind: null })).toEqual([ALAN])
  expect(recipientsFor({ ownerUserId: JENNY.userId, kind: "seat-reply" })).toEqual([JENNY])
})

test("a surplus fall on Alan's feed also reaches Jenny's app", () => {
  expect(recipientsFor({ ownerUserId: ALAN.userId, kind: "surplus-fall" })).toEqual([ALAN, JENNY])
})

test("a surplus fall on Jenny's own feed reaches her once", () => {
  expect(recipientsFor({ ownerUserId: JENNY.userId, kind: "surplus-fall" })).toEqual([JENNY])
})

test("a person no app pushes to is reached by nobody", () => {
  expect(
    recipientsFor({ ownerUserId: "01a00000-0000-7000-8000-000000000000", kind: null })
  ).toEqual([])
})

test("a push carries its route only to an app that opens a tapped route", () => {
  const content = { title: "Couples therapist", body: "Jenny, what did you", route: "/seat/a" }
  expect(apnsPayloadFor(ALAN, content)).toEqual(buildApnsPayload(content))
  expect(apnsPayloadFor(JENNY, content)).toEqual({
    aps: { alert: { title: "Couples therapist", body: "Jenny, what did you" }, sound: "default" },
  })
})

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
