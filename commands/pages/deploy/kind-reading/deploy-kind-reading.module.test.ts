import { afterAll, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import {
  type Apps,
  CLUSTER_SERVICE,
  IOS_APP,
  kindNamed,
  WEB_APP,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { writingUnder } from "akasha/infrastructure/services/clusters/web-app-reading/web-app-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"

const HOLD = "/var/tmp"

const PREFIX = "akasha-deploy-kind-"

const WEB_APPS_AT = "akasha/service-system/web-apps/pages"

const IOS_PAGES_AT = "akasha:pages/ios-app"

const SERVICES_AT = "akasha/services/clusters/pages"

const UNITS_AT = "akasha/services/workstations/pages"

type World = {
  readonly root: string
  readonly sweep: () => undefined
}

function pageOf(name: string, slug: string, pageTypeSlug: string): string {
  return [
    `export const ${name} = {`,
    `  pageTypeSlug: "${pageTypeSlug}",`,
    `  slug: "${slug}",`,
    "}",
    "",
  ].join("\n")
}

function seededWorld(): World {
  const root = mkdtempSync(join(HOLD, PREFIX))
  const written = writingUnder(root)
  let at = 0
  const filed = (folder: string, name: string, slug: string, pageTypeSlug: string): undefined => {
    const path = `${folder}/${slug}.${pageTypeSlug}.ts`
    at += 1
    const id = `01a05f90-0000-7000-8000-00000000000${String(at)}`
    written(path, pageOf(name, slug, pageTypeSlug))
    listedFiled(root, pageTypeSlug, slug, [{ path, id }])
    valueAlsoFiled(root, pageTypeSlug, [{ path, value: { id, pageTypeSlug, slug } }])
  }
  filed(WEB_APPS_AT, "oneWeb", "one-web", "web-app")
  filed(WEB_APPS_AT, "bothApp", "both-app", "web-app")
  filed(SERVICES_AT, "oneService", "one-service", "service-cluster")
  filed(SERVICES_AT, "oneWebService", "one-web", "service-cluster")
  filed(SERVICES_AT, "bothWays", "both-ways", "service-cluster")
  filed(UNITS_AT, "oneUnit", "one-unit", "service-workstation")
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}

const SEEDED: Apps = {
  "phone-app": { pagePath: `${IOS_PAGES_AT}/phone-app-ios.ios-app.md` },
  "both-app": { pagePath: `${IOS_PAGES_AT}/both-app-ios.ios-app.md` },
  "both-ways": { pagePath: `${IOS_PAGES_AT}/both-ways-ios.ios-app.md` },
}

const ios = (): Apps => SEEDED

const WORLD = seededWorld()

afterAll(() => {
  WORLD.sweep()
})

test("a slug only a web app page carries is answered as a web app", () => {
  const read = kindNamed(WORLD.root, "one-web", ios)
  expect(read).toEqual({ kind: WEB_APP, pagePath: `${WEB_APPS_AT}/one-web.web-app.ts` })
})

test("a slug only an ios app page carries is answered as an ios app", () => {
  const read = kindNamed(WORLD.root, "phone-app", ios)
  expect(read).toEqual({
    kind: IOS_APP,
    pagePath: `${IOS_PAGES_AT}/phone-app-ios.ios-app.md`,
  })
})

test("an ios app is found by the slug its page states rather than by its filename", () => {
  const read = kindNamed(WORLD.root, "phone-app-ios", ios)
  expect(read).toHaveProperty("refused")
})

test("a slug both kinds carry is refused rather than chosen between", () => {
  const read = kindNamed(WORLD.root, "both-app", ios)
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("unsettled")
  expect(why).toContain(`${WEB_APPS_AT}/both-app.web-app.ts`)
  expect(why).toContain(`${IOS_PAGES_AT}/both-app-ios.ios-app.md`)
})

test("a slug no kind carries is refused by naming all three kinds", () => {
  const read = kindNamed(WORLD.root, "no-such-app", ios)
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("no-such-app")
  expect(why).toContain("web app")
  expect(why).toContain("ios app")
  expect(why).toContain("cluster service")
  expect(why).toContain("one-web")
  expect(why).toContain("phone-app")
  expect(why).toContain("one-service")
})

test("a slug only a cluster service page carries is answered as a cluster service", () => {
  const read = kindNamed(WORLD.root, "one-service", ios)
  expect(read).toEqual({
    kind: CLUSTER_SERVICE,
    pagePath: `${SERVICES_AT}/one-service.service-cluster.ts`,
  })
})

test("a slug a web app and a cluster service both carry is answered as the web app", () => {
  const read = kindNamed(WORLD.root, "one-web", ios)
  expect(read).toEqual({ kind: WEB_APP, pagePath: `${WEB_APPS_AT}/one-web.web-app.ts` })
})

test("a slug only a workstation service page carries is answered as a workstation service", () => {
  const read = kindNamed(WORLD.root, "one-unit", ios)
  expect(read).toEqual({
    kind: WORKSTATION_SERVICE,
    pagePath: `${UNITS_AT}/one-unit.service-workstation.ts`,
  })
})

test("a slug an ios app and a cluster service both carry is refused rather than chosen between", () => {
  const read = kindNamed(WORLD.root, "both-ways", ios)
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("unsettled")
  expect(why).toContain(`${IOS_PAGES_AT}/both-ways-ios.ios-app.md`)
  expect(why).toContain(`${SERVICES_AT}/both-ways.service-cluster.ts`)
})

test("ios app pages that will not read refuse the call rather than answering that there are none", () => {
  const read = kindNamed(WORLD.root, "phone-app", () => {
    throw new Error("the pages went unread")
  })
  expect(read).toHaveProperty("refused")
  expect((read as { refused: string }).refused).toContain("the pages went unread")
})

test("the ios apps are read from the checkout rather than from the root given", () => {
  const read = kindNamed(WORLD.root, "alanwalton")
  expect(read).toHaveProperty("kind", IOS_APP)
  expect((read as { pagePath: string }).pagePath).toEndWith("/alanwalton.ios-app.ts")
})
