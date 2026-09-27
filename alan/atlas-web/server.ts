import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import {
  formatWatermark,
  observeRss,
  RSS_SAMPLE_INTERVAL_MS,
} from "akasha/alan/atlas-web/modules/memory-watch/memory-watch.module.code.ts"
import {
  formatArrival,
  formatCompletion,
} from "akasha/alan/atlas-web/modules/request-log/request-log.module.code.ts"
import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import "akasha/design/language/lua-compiler/performance-global/performance-global.type-declaration.d.ts"

const MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024

let requestSeq = 0

async function logged(request: Request, served: () => Promise<Response>): Promise<Response> {
  requestSeq += 1
  const seq = requestSeq
  const pathname = new URL(request.url).pathname
  const startedAt = performance.now()
  console.log(
    formatArrival({
      seq,
      method: request.method,
      path: pathname,
      range: request.headers.get("Range"),
      contentLength: request.headers.get("Content-Length"),
      userAgent: request.headers.get("User-Agent"),
      rssBytes: process.memoryUsage.rss(),
    })
  )
  const response = await served()
  console.log(
    formatCompletion({
      seq,
      method: request.method,
      path: pathname,
      status: response.status,
      durationMs: performance.now() - startedAt,
      rssBytes: process.memoryUsage.rss(),
    })
  )
  return response
}

await servedRouterApp({
  name: "atlas/web",
  root: import.meta.dir,
  csp: {
    connectSrc: ["https://protomaps.github.io"],
    imgSrc: ["blob:", "https://protomaps.github.io"],
    workerSrc: ["blob:"],
  },
  whoIsReading: handoverReader(ATLAS_SITE),
  maxRequestBodySize: MAX_REQUEST_BODY_BYTES,
  around: logged,
})

let rssWatermark = 0
setInterval(() => {
  const decision = observeRss(process.memoryUsage.rss(), rssWatermark)
  rssWatermark = decision.watermark
  if (decision.report) console.log(formatWatermark(decision.watermark))
}, RSS_SAMPLE_INTERVAL_MS).unref()
