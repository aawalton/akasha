import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { COOLDOWN_SECONDS } from "akasha/infrastructure/service/modules/deploy-choosing/deploy-choosing.module.code.ts"
import {
  afterIn,
  bySlug,
  cooldownIn,
  iosSubjects,
  kindedElsewhere,
  pushedNowhere,
  type Subject,
} from "akasha/infrastructure/service/modules/deploy-subject-listing/deploy-subject-listing.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"

const SCRATCH = scratchWorld()

afterAll(SCRATCH.sweep)

const IOS_APP = "ios-app"

const WAITING_PAGE = "akasha/held/held-waiting/held-waiting.ios-app.ts"

const HURRIED_PAGE = "akasha/held/held-hurried/held-hurried.ios-app.ts"

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
  expect(afterIn({ deploysAfter: ["service-cluster/page-service", "temper-web"] })).toEqual([
    "page-service",
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

test("every ios app is a subject named by its slug, waiting the cooldown its page states", () => {
  const root = SCRATCH.rootFor("deploy-subjects-")
  valueAlsoFiled(root, IOS_APP, [
    { path: HURRIED_PAGE, value: { slug: "held-hurried" } },
    { path: WAITING_PAGE, value: { slug: "held-waiting", cooldownSeconds: 3600 } },
  ])
  const said = iosSubjects(root, {
    "held-waiting": { pagePath: WAITING_PAGE },
    "held-hurried": { pagePath: HURRIED_PAGE },
  })
  expect(said.map((one) => one.slug)).toEqual(["held-hurried", "held-waiting"])
  expect(said[0]?.kind).toBe("ios-app")
  expect(said[0]?.pagePath).toBe(HURRIED_PAGE)
  expect(said[0]?.cooldownSeconds).toBe(COOLDOWN_SECONDS)
  expect(said[1]?.cooldownSeconds).toBe(3600)
})
