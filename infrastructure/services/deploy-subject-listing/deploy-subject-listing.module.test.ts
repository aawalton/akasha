import { expect, test } from "bun:test"
import { COOLDOWN_SECONDS } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  afterIn,
  bySlug,
  cooldownIn,
  iosSubjects,
  kindedElsewhere,
  pushedNowhere,
  type Subject,
} from "akasha/infrastructure/services/deploy-subject-listing/deploy-subject-listing.module.code.ts"

function subject(slug: string): Subject {
  return {
    kind: "web-app",
    slug,
    pagePath: `${slug}.web-app.ts`,
    cooldownSeconds: COOLDOWN_SECONDS,
    deploysAfter: [],
  }
}

test("a page stating no cooldown carries the default", () => {
  expect(cooldownIn({})).toBe(COOLDOWN_SECONDS)
  expect(cooldownIn(null)).toBe(COOLDOWN_SECONDS)
})

test("a page stating a cooldown carries that cooldown", () => {
  expect(cooldownIn({ cooldownSeconds: 3600 })).toBe(3600)
})

test("a page naming no service it deploys after names none", () => {
  expect(afterIn({})).toEqual([])
  expect(afterIn(null)).toEqual([])
})

test("a service named as qualified is carried as its slug alone", () => {
  expect(afterIn({ deploysAfter: ["service-cluster/pages-service", "temper-web"] })).toEqual([
    "pages-service",
    "temper-web",
  ])
})

test("subjects come back ordered by slug", () => {
  const said = bySlug([subject("beta"), subject("alpha")]).map((one) => one.slug)
  expect(said).toEqual(["alpha", "beta"])
})

test("a page a deploy reads as another kind is no subject of the kind it is filed under", () => {
  const web = { kind: "web-app", pagePath: "temper-web.web-app.ts" } as const
  expect(kindedElsewhere("service-cluster", web)).toBe(true)
})

test("a page a deploy reads as the kind it is filed under is a subject of that kind", () => {
  const same = { kind: "service-cluster", pagePath: "loki.service-cluster.ts" } as const
  expect(kindedElsewhere("service-cluster", same)).toBe(false)
})

test("a page whose slug a deploy refuses to read is left a subject", () => {
  expect(kindedElsewhere("service-cluster", { refused: "two pages are named that" })).toBe(false)
})

test("a container recipe naming where its image is pushed is a subject", () => {
  expect(pushedNowhere("container-recipe", { repository: "cluster/eso-rig" })).toBe(false)
})

test("a container recipe naming no repository is no subject, since a deploy has nowhere to push it", () => {
  expect(pushedNowhere("container-recipe", {})).toBe(true)
  expect(pushedNowhere("container-recipe", null)).toBe(true)
})

test("a page of any other kind is a subject whether or not it names a repository", () => {
  expect(pushedNowhere("service-cluster", {})).toBe(false)
  expect(pushedNowhere("eso-addon", null)).toBe(false)
})

test("every ios app is a subject named by its slug", () => {
  const said = iosSubjects({
    alanwalton: { pagePath: "alanwalton.ios-app.ts" },
    aine: { pagePath: "aine.ios-app.ts" },
  })
  expect(said.map((one) => one.slug)).toEqual(["aine", "alanwalton"])
  expect(said[0]?.kind).toBe("ios-app")
  expect(said[0]?.pagePath).toBe("aine.ios-app.ts")
  expect(said[0]?.cooldownSeconds).toBe(COOLDOWN_SECONDS)
})
