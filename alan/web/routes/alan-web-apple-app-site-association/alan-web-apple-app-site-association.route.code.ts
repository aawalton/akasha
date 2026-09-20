const APP_ID = "M6AN6NM6FL.com.alanwalton.app"

const SIGN_IN_RETURN = "/handover/app"

const ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: [APP_ID],
        components: [{ "/": SIGN_IN_RETURN, comment: "the sign-in code coming back to the app" }],
      },
    ],
  },
  webcredentials: { apps: [APP_ID] },
}

const AS_JSON = "application/json"

const HELD_FOR = "public, max-age=3600"

export function loader(): Response {
  return new Response(JSON.stringify(ASSOCIATION), {
    status: 200,
    headers: { "content-type": AS_JSON, "cache-control": HELD_FOR },
  })
}
