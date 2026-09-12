import { expect, test } from "bun:test"
import { COOLDOWN_SECONDS } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import {
  afterIn,
  bySlug,
  cooldownIn,
  iosSubjects,
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
