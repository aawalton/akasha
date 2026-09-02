import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { said } from "@akasha/utils-run/running"
import { IOS_APP, kindNamed, WEB_APP } from "./deploy-kind-reading.module.code.ts"

const HOLD = "/var/tmp"

const PREFIX = "akasha-deploy-kind-"

const WEB_APPS_AT = "akasha/service-system/web-apps/pages"

const IOS_APPS_AT = "akasha/code-system/ios-app/ios-apps"

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
  written(
    `${IOS_APPS_AT}/phone-app/phone-app.ios-app.ts`,
    pageOf("phoneApp", "phone-app", "ios-app")
  )
  written(`${IOS_APPS_AT}/both-app/both-app.ios-app.ts`, pageOf("bothApp", "both-app", "ios-app"))
  said(["git", "-C", root, "init", "-q"])
  said(["git", "-C", root, "add", "-A"])
  return {
    root,
    sweep: (): undefined => {
      rmSync(root, { recursive: true, force: true })
    },
  }
}

const WORLD = seededWorld()

const BARE = mkdtempSync(join(HOLD, PREFIX))

afterAll(() => {
  WORLD.sweep()
  rmSync(BARE, { recursive: true, force: true })
})

test("a slug only a web app page carries is answered as a web app", () => {
  const read = kindNamed(WORLD.root, "one-web")
  expect(read).toEqual({ kind: WEB_APP, pagePath: `${WEB_APPS_AT}/one-web.web-app.ts` })
})

test("a slug only an ios app page carries is answered as an ios app", () => {
  const read = kindNamed(WORLD.root, "phone-app")
  expect(read).toEqual({
    kind: IOS_APP,
    pagePath: `${IOS_APPS_AT}/phone-app/phone-app.ios-app.ts`,
  })
})

test("a slug both kinds carry is refused rather than chosen between", () => {
  const read = kindNamed(WORLD.root, "both-app")
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("unsettled")
  expect(why).toContain(`${WEB_APPS_AT}/both-app.web-app.ts`)
  expect(why).toContain(`${IOS_APPS_AT}/both-app/both-app.ios-app.ts`)
})

test("a slug neither kind carries is refused by naming both kinds", () => {
  const read = kindNamed(WORLD.root, "no-such-app")
  expect(read).toHaveProperty("refused")
  const why = (read as { refused: string }).refused
  expect(why).toContain("no-such-app")
  expect(why).toContain("web app")
  expect(why).toContain("ios app")
  expect(why).toContain("one-web")
  expect(why).toContain("phone-app")
})

test("a root git will not list is refused by naming git", () => {
  const read = kindNamed(BARE, "one-web")
  expect(read).toHaveProperty("refused")
  expect((read as { refused: string }).refused).toContain("git could not list")
})
