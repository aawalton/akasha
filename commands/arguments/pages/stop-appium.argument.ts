import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const stopAppium = {
  id: "01a094c4-10e3-7bc4-90cd-1c63e9ce7a33",
  type: "argument",
  slug: "stop-appium",
  said: "--stop-appium",
  takes: "stop the mac's Appium server as well as ending the session",
  value: "none",
} as const satisfies Argument
