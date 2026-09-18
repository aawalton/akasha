import type { SpotifyAccountCallsInWindow } from "akasha/alan/music/spotify/account/properties/spotify-account-calls-in-window.number-property.types.ts"
import type { SpotifyAccountClientId } from "akasha/alan/music/spotify/account/properties/spotify-account-client-id.text-property.types.ts"
import type { SpotifyAccountClientSecret } from "akasha/alan/music/spotify/account/properties/spotify-account-client-secret.text-property.types.ts"
import type { SpotifyAccountRedirectUri } from "akasha/alan/music/spotify/account/properties/spotify-account-redirect-uri.text-property.types.ts"
import type { SpotifyAccountRetryAllowedAt } from "akasha/alan/music/spotify/account/properties/spotify-account-retry-allowed-at.instant-property.types.ts"
import type { SpotifyAccountWindowStartedAt } from "akasha/alan/music/spotify/account/properties/spotify-account-window-started-at.instant-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type SpotifyAccount = Page & {
  clientId?: SpotifyAccountClientId
  clientSecret?: SpotifyAccountClientSecret
  redirectUri: SpotifyAccountRedirectUri
  windowStartedAt?: SpotifyAccountWindowStartedAt
  callsInWindow?: SpotifyAccountCallsInWindow
  retryAllowedAt?: SpotifyAccountRetryAllowedAt
}
