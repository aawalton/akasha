import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"

const MAX_REQUEST_BODY_BYTES = 2 * 1024 * 1024

await servedRouterApp({
  name: "requests/web",
  root: import.meta.dir,
  csp: {},
  whoIsReading: handoverReader(REQUESTS_SITE),
  maxRequestBodySize: MAX_REQUEST_BODY_BYTES,
})
