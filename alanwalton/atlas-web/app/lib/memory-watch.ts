export const RSS_REPORT_STEP_BYTES = 8 * 1024 * 1024

export const RSS_SAMPLE_INTERVAL_MS = 2_000

export type WatermarkDecision = {
  report: boolean
  watermark: number
}

export function observeRss(
  rssBytes: number,
  watermark: number,
  step: number = RSS_REPORT_STEP_BYTES
): WatermarkDecision {
  if (rssBytes < watermark + step) return { report: false, watermark }
  return { report: true, watermark: rssBytes }
}

export function formatWatermark(rssBytes: number): string {
  return `[atlas/web] rss high=${(rssBytes / 1024 / 1024).toFixed(1)}MiB`
}
