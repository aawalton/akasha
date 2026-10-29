import { expect, test } from "bun:test"
import { runSite } from "akasha/alan/collection/watching/browser-extensions/streaming-watching.browser-extension.extension-site.code.ts"

test("the site code refuses to start where no extension runs", () => {
  expect(() => runSite()).toThrow("no extension runs here")
})
