export const TEST_RUN = "AKASHA_TEST_RUN"

export function inATestRun(): boolean {
  if (typeof process !== "undefined" && process.env?.[TEST_RUN] === "1") return true
  return typeof Bun !== "undefined" && /\.test\.tsx?$/.test(Bun.main)
}
