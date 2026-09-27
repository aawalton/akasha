import { signedInAs } from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"

await servedRouterApp({
  name: "alanwalton-web",
  root: import.meta.dir,
  csp: { mediaSrc: ["blob:"], imgSrc: ["blob:"] },
  whoIsReading: async (request) => ({ user: await signedInAs(request) }),
  async around(request, served) {
    if (new URL(request.url).hostname === "idle.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/", 301)
    }
    return served()
  },
})
