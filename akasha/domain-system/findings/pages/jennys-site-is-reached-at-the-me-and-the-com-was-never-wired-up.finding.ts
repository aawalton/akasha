import type { Finding } from "../finding.page-type.ts"

export const jennysSiteIsReachedAtTheMeAndTheComWasNeverWiredUp = {
  id: "01a05b69-fc8a-777e-8ab9-90938516ec71",
  pageTypeSlug: "finding",
  slug: "jennys-site-is-reached-at-the-me-and-the-com-was-never-wired-up",
  domainSlug: "page-type/web-app",
  claim:
    "Jenny's site is reachable from the internet at `smilingjenny.me`, the only name the system gives it. `smilingjenny.com` is a separate domain of Alan's that was never wired up: it is spelled nowhere in this repository, it is not in the tunnel, and its zone was never delegated to Cloudflare. Taking the parked `.com` for Jenny's site being down mistakes a domain nobody wired for the one that serves.",
  evidence:
    '`curl https://smilingjenny.me/` answers 302 to `/sign-in`, which answers 200 over 9561 bytes titled `Smiling Jenny`. The pod serves the same on its own: port-forwarding `svc/web` in `smilingjenny` gives the same 302, the same 200 and the same byte count, and `/api/categorization` answers `{"ok":false,"error":"Not authenticated."}` at 401. The three feeds the widgets read answer that same 401 publicly, so the tunnel carries the widget\'s own routes and the app rather than Cloudflare is what replies. One name is stated four times and agrees each time: `hostnames: ["smilingjenny.me"]` on `smilingjenny-web.web-app.ts:11`, `smilingjenny/web/tunnel-routes.ts:10` pointing at `http://web.smilingjenny.svc.cluster.local:3000`, that same pair in `cm/cloudflared-config` in the cluster, and `https://smilingjenny.me` in the auth-proxy origin allowlist. The widgets\' Swift endpoints, the Capacitor `allowNavigation` and the readout widget feeds all name `.me` too. Searching the tree for `smilingjenny.com` returns nothing. On DNS, `smilingjenny.me` sits on `fatima`/`zod.ns.cloudflare.com`, the same nameservers as `alanwalton.com` and `audhdalan.com`, which both answer 200; `smilingjenny.com` sits on `dns1`/`dns2.registrar-servers.com` and resolves to 162.255.119.232, a Namecheap parking address that never answers. The call taken in Alan\'s absence: nothing was changed. A tunnel route for a name no page claims would have been a guess at what he wants the `.com` for.',
} as const satisfies Finding
