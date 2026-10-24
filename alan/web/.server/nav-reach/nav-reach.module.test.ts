import { expect, test } from "bun:test"
import {
  type NavReach,
  reachedNavItems,
} from "akasha/alan/web/.server/nav-reach/nav-reach.module.code.ts"

const SEATS = { slug: "seats", title: "Seats" }

const DAYS = { slug: "days", title: "Days" }

const THERAPY = { slug: "therapy", title: "Therapy", navHref: "/therapy" }

const DESIGN = { slug: "design-system", title: "Design", navHref: "/design" }

const GRAFANA = { slug: "grafana", title: "Grafana", navHref: "https://grafana.alanwalton.com" }

const EVERY_ITEM = [SEATS, DAYS, THERAPY, DESIGN, GRAFANA]

const JENNY: NavReach = { readsNav: false, routes: ["therapy"] }

const ALAN: NavReach = { readsNav: true, routes: ["all"] }

test("a reader who reads no nav page of the app sees only the routes her access names", () => {
  expect(reachedNavItems(JENNY, EVERY_ITEM)).toEqual([THERAPY])
})

test("a reader holding every route and every nav page sees every item", () => {
  expect(reachedNavItems(ALAN, EVERY_ITEM)).toEqual(EVERY_ITEM)
})

test("a reader holding no route sees no item that leads to a route", () => {
  expect(reachedNavItems({ readsNav: true, routes: [] }, EVERY_ITEM)).toEqual([SEATS, DAYS])
})

test("an item naming no slug is reached by no route access", () => {
  expect(reachedNavItems(JENNY, [{ navHref: "/therapy" }])).toEqual([])
})
