import {
  type ConsoleCapture,
  createConsoleCapture,
} from "akasha/code/browser/test-harness/modules/console-capture/console-capture.module.code.ts"
import {
  CHROMIUM_ARGS,
  CHROMIUM_LAUNCH_ENV,
} from "akasha/code/browser/test-harness/modules/harness-launch/harness-launch.module.code.ts"
import { type Browser, type BrowserContext, chromium, type Page } from "playwright-core"

interface ReadOnlyAnonSession {
  readonly browser: Browser
  readonly context: BrowserContext
  readonly page: Page
  readonly consoleCapture: ConsoleCapture
  readonly teardown: () => Promise<void>
}

export async function createReadOnlyAnonSession(): Promise<ReadOnlyAnonSession> {
  const browser = await chromium.launch({
    headless: true,
    args: CHROMIUM_ARGS,
    env: CHROMIUM_LAUNCH_ENV,
  })
  try {
    const context = await browser.newContext()
    const page = await context.newPage()
    const consoleCapture = createConsoleCapture(page)
    return {
      browser,
      context,
      page,
      consoleCapture,
      teardown: async (): Promise<void> => {
        await browser.close()
      },
    }
  } catch (err) {
    await browser.close()
    throw err
  }
}
