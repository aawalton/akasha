import {
  noReader,
  servedRouterApp,
} from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"

await servedRouterApp({
  name: "audhdalan-web",
  root: import.meta.dir,
  csp: {},
  whoIsReading: noReader,
})
