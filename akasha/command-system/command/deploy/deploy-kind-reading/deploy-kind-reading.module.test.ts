import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said } from "@akasha/utils-run/running"
import { type Apps, IOS_APP, kindNamed, WEB_APP } from "./deploy-kind-reading.module.code.ts"

const HOLD = "/var/tmp"

const PREFIX = "akasha-deploy-kind-"

const WEB_APPS_AT = "akasha/service-system/web-apps/pages"

const IOS_PAGES_AT = "akasha:pages/ios-app"

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
  const written = (path: string, body: string): undefined => {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body, "utf8")
  }
  written(`${WEB_APPS_AT}/one-web.web-app.ts`, pageOf("oneWeb", "one-web", "web-app"))
  written(`${WEB_APPS_AT}/both-app.web-app.ts`, pageOf("bothApp", "both-app", "web-app"))
  said(["git", "-C", root, "init", "-q"])
  said(["git", "-C", root, "add", "-A"])
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
}

const ios = (): Apps => SEEDED

const WORLD = seededWorld()

const BARE = mkdtempSync(join(HOLD, PREFIX))

afterAll(() => {
  WORLD.sweep()
  rmSync(BARE, { recursive: true, force: true })
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

test("a slug neither kind carries is refused by naming both kinds", () => {
  const read = kindNamed(WORLD.root, "no-such-app", ios)
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("no-such-app")
  expect(why).toContain("web app")
  expect(why).toContain("ios app")
  expect(why).toContain("one-web")
  expect(why).toContain("phone-app")
})

test("a root git will not list is refused by naming git", () => {
  const read = kindNamed(BARE, "one-web", ios)
  expect(read).toHaveProperty("refused")
  expect((read as { refused: string }).refused).toContain("git could not list")
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
  expect(read).toEqual({
    kind: IOS_APP,
    pagePath: `${IOS_PAGES_AT}/alanwalton-ios.ios-app.md`,
  })
})
