import { afterEach } from "bun:test"
import { GlobalRegistrator } from "@happy-dom/global-registrator"

const nativeFetch = globalThis.fetch

GlobalRegistrator.register()

globalThis.fetch = nativeFetch

const { cleanup } = await import("@testing-library/react")
afterEach(() => {
  cleanup()
})
