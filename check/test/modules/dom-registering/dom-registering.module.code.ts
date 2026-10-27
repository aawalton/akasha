import { afterEach } from "bun:test"
import { GlobalRegistrator } from "@happy-dom/global-registrator"

const nativeFetch = globalThis.fetch

const nativeAbortController = globalThis.AbortController

const nativeAbortSignal = globalThis.AbortSignal

GlobalRegistrator.register()

globalThis.fetch = nativeFetch
globalThis.AbortController = nativeAbortController
globalThis.AbortSignal = nativeAbortSignal

const { cleanup } = await import("@testing-library/react")
afterEach(() => {
  cleanup()
})
