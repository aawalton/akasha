import {
  legClosed,
  legSaid,
} from "akasha/alan/couples-therapy/couples-call/modules/room/couples-call-room.module.code.ts"
import {
  lookingRefused,
  signedInAs,
} from "akasha/alan/harness/better-auth-rr/modules/google-auth-guard/google-auth-guard.module.code.ts"
import { servedRouterApp } from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"

await servedRouterApp({
  name: "alanwalton-web",
  root: import.meta.dir,
  csp: {
    mediaSrc: ["blob:"],
    imgSrc: ["blob:"],
    connectSrc: ["wss://generativelanguage.googleapis.com"],
    microphone: true,
  },
  whoIsReading: async (request) => ({ user: await signedInAs(request) }),
  socket: {
    path: "/api/call/stream",
    said: (socket, text) => legSaid(socket, text),
    closed: legClosed,
  },
  async around(request, served) {
    if (new URL(request.url).hostname === "idle.alanwalton.com") {
      return Response.redirect("https://alanwalton.com/", 301)
    }
    return (await lookingRefused(request)) ?? served()
  },
})
