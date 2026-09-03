const ORIGIN = "https://app.monarch.com"

export async function monarchHeaders(): Promise<Readonly<Record<string, string>>> {
  const cookie = process.env.MONARCH_COOKIE?.trim()
  if (!cookie) {
    throw new Error(
      "no Monarch credential: set MONARCH_COOKIE to the whole Cookie header from a signed-in " +
        "browser session at app.monarch.com. It is a session cookie rather than an issued key, " +
        "so it expires and only Alan at a browser can produce another."
    )
  }
  const csrf = /csrftoken=([^;]+)/.exec(cookie)?.[1]
  if (!csrf) {
    throw new Error(
      "MONARCH_COOKIE carries no `csrftoken=` value. Monarch matches the X-CSRFToken header " +
        "against that cookie and refuses the pair when they disagree, so a cookie without one " +
        "cannot authenticate. The whole Cookie header is wanted here, not one of its parts."
    )
  }
  return Object.freeze({
    "Content-Type": "application/json",
    "Client-Platform": "web",
    Cookie: cookie,
    "X-CSRFToken": csrf,
    Origin: ORIGIN,
    Referer: `${ORIGIN}/`,
  })
}
