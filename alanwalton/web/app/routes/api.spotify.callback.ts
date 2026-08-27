import type { Route } from "./+types/api.spotify.callback"

export function loader({ request }: Route.LoaderArgs): Response {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")
  const state = url.searchParams.get("state")

  if (error != null) {
    return new Response(
      `<html><body style="font-family:monospace;padding:2rem">
        <h2>Authorization Denied</h2>
        <p>${error}</p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    )
  }

  if (code == null) {
    return new Response(
      `<html><body style="font-family:monospace;padding:2rem">
        <h2>Missing Code</h2>
        <p>No authorization code received.</p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    )
  }

  return new Response(
    `<html><body style="font-family:monospace;padding:2rem">
      <h2>Spotify Authorization Code</h2>
      <p>Copy this code and paste it into the CLI:</p>
      <pre style="border:1px solid;padding:1rem;border-radius:4px;user-select:all">${code}</pre>
      ${state != null ? `<p>State: ${state}</p>` : ""}
      <p>You can close this tab.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  )
}
