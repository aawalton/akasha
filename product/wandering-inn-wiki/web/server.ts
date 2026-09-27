import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { whoIsReading } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reader/innworld-reader.module.code.ts"

await servedRouterApp({
  name: "innworld-web",
  root: import.meta.dir,
  csp: {},
  whoIsReading,
  heldToGrants: true,
})
