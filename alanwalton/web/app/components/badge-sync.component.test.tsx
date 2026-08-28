import { afterEach, describe, expect, it, mock } from "bun:test"
import { UserIdContext } from "@shared/pages-ui/use-user-id"
import { act, cleanup } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { OPEN_QUESTIONS_RESYNC_EVENT } from "~/lib/open-questions-resync"

const setCountCalls: number[] = []
let currentCount = 0
let badgePresent = true
const fakeBadge = {
  setCount: async ({ count }: { count: number }) => {
    setCountCalls.push(count)
  },
}

const realBridge = await import("~/lib/capacitor-bridge")
const realIsNativeShell = realBridge.isNativeShell
const realGetStatusBar = realBridge.getStatusBar
const realGetFilesystem = realBridge.getFilesystem
const realGetPushNotifications = realBridge.getPushNotifications
const realGetApp = realBridge.getApp
const realGetDeviceSecret = realBridge.getDeviceSecret
mock.module("~/lib/capacitor-bridge", () => ({
  isNativeShell: realIsNativeShell,
  getStatusBar: realGetStatusBar,
  getFilesystem: realGetFilesystem,
  getPushNotifications: realGetPushNotifications,
  getApp: realGetApp,
  getDeviceSecret: realGetDeviceSecret,
  getBadge: () => (badgePresent ? fakeBadge : null),
  getKokoroTts: realBridge.getKokoroTts,
}))

const realOpenQuestions = await import("@shared/open-questions")
const realOpenQuestionsWhere = realOpenQuestions.openQuestionsWhere
const realQuestionSlug = realOpenQuestions.QUESTION_PAGE_TYPE_SLUG
const realOpenStatus = realOpenQuestions.OPEN_QUESTION_STATUS
const realDismissedStatus = realOpenQuestions.DISMISSED_QUESTION_STATUS
mock.module("@shared/open-questions", () => ({
  QUESTION_PAGE_TYPE_SLUG: realQuestionSlug,
  OPEN_QUESTION_STATUS: realOpenStatus,
  DISMISSED_QUESTION_STATUS: realDismissedStatus,
  openQuestionsWhere: realOpenQuestionsWhere,
  countOpenQuestions: async () => currentCount,
  QUESTION_LINK_PLATFORMS: realOpenQuestions.QUESTION_LINK_PLATFORMS,
  ANSWERED_QUESTION_STATUS: realOpenQuestions.ANSWERED_QUESTION_STATUS,
  ANSWERED_OPTION_INDEX_KEY: realOpenQuestions.ANSWERED_OPTION_INDEX_KEY,
  RECONCILED_AT_KEY: realOpenQuestions.RECONCILED_AT_KEY,
  selectTappedOptionIndex: realOpenQuestions.selectTappedOptionIndex,
}))

const realProvider = await import("../../../../shared/supabase-rr/src/provider.tsx")
const realSupabaseProvider = realProvider.SupabaseProvider
mock.module("../../../../shared/supabase-rr/src/provider.tsx", () => ({
  SupabaseProvider: realSupabaseProvider,
  useSupabase: () => ({}),
}))

const { BadgeSync } = await import("./badge-sync")

function installNative(present: boolean) {
  badgePresent = present
  window.Capacitor = { isNativePlatform: () => true, Plugins: {} }
}

afterEach(() => {
  cleanup()
  setCountCalls.length = 0
  currentCount = 0
  badgePresent = true
  window.Capacitor = undefined
})

async function flush() {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })
}

function renderSync(userID: string | null) {
  render(
    <UserIdContext value={userID}>
      <BadgeSync />
    </UserIdContext>
  )
}

describe("BadgeSync", () => {
  it("sets the badge to the true count on launch when signed in on the native shell", async () => {
    currentCount = 3
    installNative(true)
    renderSync("user-abc")
    await flush()
    expect(setCountCalls).toEqual([3])
  })

  it("re-applies the badge on foreground (visibilitychange -> visible)", async () => {
    currentCount = 2
    installNative(true)
    renderSync("user-abc")
    await flush()
    expect(setCountCalls).toEqual([2])

    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"))
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(setCountCalls).toEqual([2, 2])
  })

  it("re-applies the badge after an in-app resolution event", async () => {
    currentCount = 5
    installNative(true)
    renderSync("user-abc")
    await flush()
    expect(setCountCalls).toEqual([5])

    currentCount = 4
    await act(async () => {
      window.dispatchEvent(new Event(OPEN_QUESTIONS_RESYNC_EVENT))
      await new Promise((resolve) => setTimeout(resolve, 0))
    })
    expect(setCountCalls).toEqual([5, 4])
  })

  it("does not touch the badge while signed out", async () => {
    currentCount = 3
    installNative(true)
    renderSync(null)
    await flush()
    expect(setCountCalls).toEqual([])
  })

  it("no-ops off the native shell (getBadge null, no window.Capacitor)", async () => {
    currentCount = 3
    renderSync("user-abc")
    await flush()
    expect(setCountCalls).toEqual([])
  })

  it("logs and no-ops when the Badge plugin is absent (build predates the seam)", async () => {
    currentCount = 3
    installNative(false)
    renderSync("user-abc")
    await flush()
    expect(setCountCalls).toEqual([])
  })
})
