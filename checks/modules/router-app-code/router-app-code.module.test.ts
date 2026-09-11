import { expect, test } from "bun:test"
import { folderOf, modulesIn, serverNamed } from "./router-app-code.module.code.ts"

const PAGE = "hum/hum.router-app.ts"

const TABLE = "hum/routes.ts"

test("an app's folder is the folder its page sits in", () => {
  expect(folderOf(PAGE)).toBe("hum/")
  expect(folderOf("top.router-app.ts")).toBe("")
})

test("only a string ending in a module extension names a route module", () => {
  const text =
    'route("home", "routes/home.tsx")\nimport { route } from "@react-router/dev/routes"\n'
  expect(modulesIn(TABLE, text)).toEqual(["routes/home.tsx"])
})

test("a name closing with `.server` before its extension is server-only", () => {
  expect(serverNamed("hum/held.server.ts")).toBe(true)
  expect(serverNamed("hum/held.ts")).toBe(false)
})

test("a module under a `.server` folder is server-only", () => {
  expect(serverNamed("hum/.server/held/held.module.code.ts")).toBe(true)
})
