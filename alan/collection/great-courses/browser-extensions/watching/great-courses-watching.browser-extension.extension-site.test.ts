import { expect, test } from "bun:test"
import { runSite } from "akasha/alan/collection/great-courses/browser-extensions/watching/great-courses-watching.browser-extension.extension-site.code.ts"

test("the site code refuses to start where no extension runs", () => {
  expect(() => runSite()).toThrow("no extension runs here")
})
