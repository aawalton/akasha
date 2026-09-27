import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"

await servedRouterApp({
  name: "archive-of-worlds-web",
  root: import.meta.dir,
  csp: {},
  whoIsReading: handoverReader(ARCHIVE_OF_WORLDS_SITE),
})
