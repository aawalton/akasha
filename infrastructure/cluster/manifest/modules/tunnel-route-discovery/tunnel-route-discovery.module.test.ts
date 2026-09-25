import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  type DiscoveredRoute,
  discoverTunnelRoutes,
} from "akasha/infrastructure/cluster/manifest/modules/tunnel-route-discovery/tunnel-route-discovery.module.code.ts"
import { valueAlsoFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const PAGE_TYPE = "page-type"

const ROUTER_APP = "router-app"

const TYPE_AT = `akasha/${ROUTER_APP}.${PAGE_TYPE}.ts`

type Stated = Readonly<Record<string, string>>

function pageAt(slug: string): string {
  return `akasha/${slug}/${slug}.${ROUTER_APP}.ts`
}

function stating(prefix: string, said: Readonly<Record<string, readonly Stated[]>>): string {
  const root = scratch.rootFor(prefix)
  valueAlsoFiled(root, PAGE_TYPE, [
    { path: TYPE_AT, value: { type: `${PAGE_TYPE}/${PAGE_TYPE}`, slug: ROUTER_APP } },
  ])
  for (const [slug, routes] of Object.entries(said)) {
    valueAlsoFiled(root, ROUTER_APP, [
      {
        path: pageAt(slug),
        value: { type: `${PAGE_TYPE}/${ROUTER_APP}`, slug, tunnelRoutes: routes },
      },
    ])
  }
  return root
}

const ALANWALTON = {
  name: "alanwalton",
  hostname: "alanwalton.com",
  service: "http://web.alanwalton.svc.cluster.local:3000",
} as const

const SMS = {
  name: "alanwalton-sms",
  hostname: "sms.alanwalton.com",
  service: "http://web.alanwalton.svc.cluster.local:3000",
} as const

const TEMPER = {
  name: "temper",
  hostname: "tempereso.com",
  service: "http://web.temper.svc.cluster.local:3000",
} as const

test("the routes a page states are the routes the tunnel is handed", () => {
  const root = stating("akasha-tunnel-stated-", {
    "alan-web": [ALANWALTON, SMS],
    "temper-web": [TEMPER],
  })

  const found: readonly DiscoveredRoute[] = discoverTunnelRoutes(root)

  expect(found.map((one) => one.route)).toEqual([ALANWALTON, SMS, TEMPER])
  expect(found.map((one) => one.sourcePage)).toEqual([
    pageAt("alan-web"),
    pageAt("alan-web"),
    pageAt("temper-web"),
  ])
})

test("a page stating no routes hands the tunnel none", () => {
  const root = stating("akasha-tunnel-bare-", { "alan-web": [], "temper-web": [TEMPER] })

  expect(discoverTunnelRoutes(root).map((one) => one.route.name)).toEqual(["temper"])
})

test("a name two pages state is refused", () => {
  const root = stating("akasha-tunnel-name-", {
    "alan-web": [TEMPER],
    "temper-web": [{ ...TEMPER, hostname: "www.tempereso.com" }],
  })

  expect(() => discoverTunnelRoutes(root)).toThrow(/duplicate name "temper"/)
})

test("a host name two pages state is refused", () => {
  const root = stating("akasha-tunnel-host-", {
    "alan-web": [TEMPER],
    "temper-web": [{ ...TEMPER, name: "temper-www" }],
  })

  expect(() => discoverTunnelRoutes(root)).toThrow(/duplicate hostname "tempereso.com"/)
})

test("a route stating an empty host name is refused", () => {
  const root = stating("akasha-tunnel-empty-", { "temper-web": [{ ...TEMPER, hostname: "" }] })

  expect(() => discoverTunnelRoutes(root)).toThrow(/empty hostname/)
})
