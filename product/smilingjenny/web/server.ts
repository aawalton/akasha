import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"

await servedRouterApp({
  name: "smilingjenny-web",
  root: import.meta.dir,
  csp: {},
  whoIsReading: handoverReader(JENNY_SITE),
})
