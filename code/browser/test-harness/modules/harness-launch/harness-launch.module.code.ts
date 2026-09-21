import { buildBrowserLaunchEnv } from "akasha/code/browser/modules/launch-env/launch-env.module.code.ts"

export const CHROMIUM_ARGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
]

export const CHROMIUM_LAUNCH_ENV = buildBrowserLaunchEnv(process.env)
