import { expect, test } from "bun:test"
import {
  type Held,
  type Moved,
  type Patch,
  readsRuntimePaths,
  runtimePatches,
} from "akasha/code/path/modules/code-runtime-path/code-runtime-path.module.code.ts"

const ROOT = "/"

const nothingMoved: Moved = () => null

const DASHBOARDS =
  'const at = join(import.meta.dir, "..", "dashboards", "pages", slug, `${slug}.json`)\n'

const GRAFANA = "infra/telemetry/grafana/one.manifest.code.ts"

function putOver(body: string, patches: readonly Patch[]): string {
  let put = ""
  let at = 0
  for (const one of patches) {
    put = `${put}${body.slice(at, one.start)}${one.text}`
    at = one.end
  }
  return `${put}${body.slice(at)}`
}

function holding(...paths: readonly string[]): Held {
  const held = new Set(paths)
  return (absolute) => held.has(absolute)
}

function carrying(was: string, now: string): Moved {
  return (absolute) => (absolute === `/${was}` ? `/${now}` : null)
}

function rewrote(
  body: string,
  was: string,
  now: string,
  held: Held,
  moved: Moved = carrying(was, now)
): string {
  return putOver(body, runtimePatches(body, was, now, moved, held).patches)
}

test("the lualib builder nested under a modules folder still reaches the lualib sources", () => {
  expect(
    rewrote(
      'const lualibRoot = path.resolve(import.meta.dir, "..", "lualib")\n',
      "design/language/lua-compiler/lualib-builder/one.module.code.ts",
      "design/language/lua-compiler/modules/lualib-builder/one.module.code.ts",
      holding("/design/language/lua-compiler/lualib")
    )
  ).toBe('const lualibRoot = path.resolve(import.meta.dir, "../../lualib")\n')
})

test("the monarch seat nested under a modules folder still reaches the repository root", () => {
  expect(
    rewrote(
      "const REPO = `${import.meta.dir}/../../../..`\n",
      "alan/harness/monarch/seat/one.module.code.ts",
      "alan/harness/monarch/modules/seat/one.module.code.ts",
      holding(ROOT)
    )
  ).toBe("const REPO = `${import.meta.dir}/../../../../..`\n")
})

test("the addon roster nested under a modules folder still falls back to the repository root", () => {
  expect(
    rewrote(
      'const DEFAULT_REPO_ROOT = resolve(import.meta.dir, "..", "..", "..")\n',
      "temper/addons-resolve/addon-roster/one.module.code.ts",
      "temper/addons-resolve/modules/addon-roster/one.module.code.ts",
      holding(ROOT)
    )
  ).toBe('const DEFAULT_REPO_ROOT = resolve(import.meta.dir, "../../../..")\n')
})

test("the compose-notices test nested under a namespace still reaches the repository root", () => {
  expect(
    rewrote(
      'const held = resolve(import.meta.dir, "../../..")\n',
      "command/pages/compose-notices/one.command.test.ts",
      "command/pages/seat/compose-notices/one.command.test.ts",
      holding(ROOT)
    )
  ).toBe('const held = resolve(import.meta.dir, "../../../..")\n')
})

test("where what moved landed is asked of a lookup, by a path from the root", () => {
  const body = 'const at = join(import.meta.dir, "..", "lualib")\n'
  const host = "a/b/host/host.module.code.ts"
  const asked: string[] = []
  const landed: Moved = (absolute) => {
    asked.push(absolute)
    return absolute === "/a/b/lualib" ? "/a/b/deep/lualib" : null
  }

  expect(rewrote(body, host, host, holding(), landed)).toBe(
    'const at = join(import.meta.dir, "../deep/lualib")\n'
  )
  expect(asked).toContain("/a/b/lualib")
  expect(rewrote(body, host, host, holding(), nothingMoved)).toBe(body)
})

test("a walk to the top asks whether the root itself is held", () => {
  const asked: string[] = []
  runtimePatches(
    'const held = resolve(import.meta.dir, "../../..")\n',
    "command/pages/compose-notices/one.command.test.ts",
    "command/pages/seat/compose-notices/one.command.test.ts",
    nothingMoved,
    (absolute) => {
      asked.push(absolute)
      return true
    }
  )

  expect(asked).toEqual([ROOT])
})

test("a body naming neither its own url nor its own directory is left as that body is", () => {
  const said = runtimePatches(
    'const at = join(process.cwd(), "..", "lualib")\n',
    "a/b/host/host.module.code.ts",
    "a/b/modules/host/host.module.code.ts",
    nothingMoved,
    holding("/a/b/lualib")
  )

  expect(said.patches).toEqual([])
  expect(said.read).toBe(0)
  expect(said.unread).toBe(0)
})

test("a name bound to a body's own directory represents that directory where it is used", () => {
  expect(
    rewrote(
      'const HERE = import.meta.dir\nconst at = join(HERE, "..", "lualib")\n',
      "a/b/host/host.module.code.ts",
      "a/b/modules/host/host.module.code.ts",
      holding("/a/b/lualib")
    )
  ).toBe('const HERE = import.meta.dir\nconst at = join(HERE, "../../lualib")\n')
})

test("a url built against a body's own url is read as a path off that body's directory", () => {
  expect(
    rewrote(
      'const at = new URL("../sibling/one.ts", import.meta.url)\n',
      "a/b/host/host.module.code.ts",
      "a/b/modules/host/host.module.code.ts",
      holding("/a/b/sibling/one.ts")
    )
  ).toBe('const at = new URL("../../sibling/one.ts", import.meta.url)\n')
})

test("a leading dot-slash gives way where the replacement climbs a directory", () => {
  expect(
    rewrote(
      'const at = new URL("./one.ts", import.meta.url)\n',
      "a/b/host/host.module.code.ts",
      "a/b/modules/host/host.module.code.ts",
      holding("/a/b/host/one.ts")
    )
  ).toBe('const at = new URL("../../host/one.ts", import.meta.url)\n')
})

test("a path built from something other than a written literal is named rather than rewritten", () => {
  const land = "infra/telemetry/modules/grafana/one.manifest.code.ts"
  const said = runtimePatches(
    DASHBOARDS,
    GRAFANA,
    land,
    carrying(GRAFANA, land),
    holding("/infra/telemetry/dashboards")
  )

  expect(said.patches).toEqual([])
  expect(said.read).toBe(0)
  expect(said.unread).toBe(1)
  expect(said.unreadable).toEqual([
    '1: `join(import.meta.dir, "..", "dashboards", "pages", slug, `${slug}.json`)`',
  ])
})

test("a base that cannot be read is named only where the move carries the body out", () => {
  const said = runtimePatches(DASHBOARDS, GRAFANA, GRAFANA, nothingMoved, holding())

  expect(said.unread).toBe(1)
  expect(said.unreadable).toEqual([])
})

test("a body is read for runtime paths by the ending its name carries", () => {
  expect(readsRuntimePaths("one.module.code.ts")).toBe(true)
  expect(readsRuntimePaths("one.route.tsx")).toBe(true)
  expect(readsRuntimePaths("one.mjs")).toBe(true)
  expect(readsRuntimePaths("one.dashboard.layout.json")).toBe(false)
})
