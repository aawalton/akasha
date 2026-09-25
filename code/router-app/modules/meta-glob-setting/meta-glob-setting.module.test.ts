import { expect, test } from "bun:test"
import "akasha/code/router-app/vite-client/vite-client.type-declaration.d.ts"

type Paged = { readonly metaGlobSetting: { readonly slug: string } }

test("a glob finds the files its pattern names, keyed from the calling file's folder", () => {
  const found = import.meta.glob("./*.module.ts", { eager: true })
  expect(Object.keys(found)).toEqual(["./meta-glob-setting.module.ts"])
})

test("a file found outside the calling file's folder keeps the climb in its key", () => {
  const found = import.meta.glob("../font-preload/*.module.ts", { eager: true })
  expect(Object.keys(found)).toEqual(["../font-preload/font-preload.module.ts"])
})

test("each file found is handed over as its loaded module", () => {
  const found = import.meta.glob<Paged>("./*.module.ts", { eager: true })
  expect(found["./meta-glob-setting.module.ts"]?.metaGlobSetting.slug).toBe("meta-glob-setting")
})

test("the calling file is left out of what its own glob finds", () => {
  const found = import.meta.glob("./*.module.test.ts", { eager: true })
  expect(Object.keys(found)).toEqual([])
})

test("a glob taken other than eagerly is refused", () => {
  expect(() => import.meta.glob("./*.module.ts")).toThrow()
})
