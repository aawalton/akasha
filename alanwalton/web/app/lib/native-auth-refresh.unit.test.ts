import { describe, expect, mock, test } from "bun:test"
import type { AppEventMap, AppPlugin, AppState, AppUrlOpen } from "./capacitor-bridge"
import { wireNativeAuthRefresh } from "./native-auth-refresh"

function fakeAuth() {
  return {
    startAutoRefresh: mock(() => Promise.resolve()),
    stopAutoRefresh: mock(() => Promise.resolve()),
  }
}

function fakeApp() {
  let listener: ((e: AppState & AppUrlOpen) => void) | null = null
  const remove = mock(() => Promise.resolve())
  const app: AppPlugin = {
    addListener: mock((_name: keyof AppEventMap, cb: (e: AppState & AppUrlOpen) => void) => {
      listener = cb
      return Promise.resolve({ remove })
    }),
    getLaunchUrl: mock(() => Promise.resolve(null)),
  }
  return { app, remove, emit: (isActive: boolean) => listener?.({ isActive, url: "" }) }
}

describe("wireNativeAuthRefresh", () => {
  test("takes control immediately: startAutoRefresh + a registered listener", async () => {
    const auth = fakeAuth()
    const { app } = fakeApp()
    wireNativeAuthRefresh(auth, app)
    expect(auth.startAutoRefresh).toHaveBeenCalledTimes(1)
    await Promise.resolve()
    expect(app.addListener).toHaveBeenCalledTimes(1)
  })

  test("foreground resumes refresh, background stops it", async () => {
    const auth = fakeAuth()
    const { app, emit } = fakeApp()
    wireNativeAuthRefresh(auth, app)
    await Promise.resolve()
    emit(false)
    expect(auth.stopAutoRefresh).toHaveBeenCalledTimes(1)
    emit(true)
    expect(auth.startAutoRefresh).toHaveBeenCalledTimes(2)
  })

  test("cleanup removes the listener and stops refresh", async () => {
    const auth = fakeAuth()
    const { app, remove } = fakeApp()
    const cleanup = wireNativeAuthRefresh(auth, app)
    await Promise.resolve()
    cleanup()
    expect(remove).toHaveBeenCalledTimes(1)
    expect(auth.stopAutoRefresh).toHaveBeenCalledTimes(1)
  })

  test("cleanup before the async registration resolves still removes the listener", async () => {
    const auth = fakeAuth()
    const { app, remove } = fakeApp()
    const cleanup = wireNativeAuthRefresh(auth, app)
    cleanup()
    await Promise.resolve()
    await Promise.resolve()
    expect(remove).toHaveBeenCalledTimes(1)
  })
})
