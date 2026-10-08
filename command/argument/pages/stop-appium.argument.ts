import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stopAppium = {
  id: "01a094c4-10e3-7bc4-90cd-1c63e9ce7a33",
  type: "page-type/argument",
  slug: "stop-appium",
  said: "--stop-appium",
  takes: "stop the mac's Appium server as well as ending the session",
  value: "none",
  createdAt: "2026-09-12T08:37:52.483Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
