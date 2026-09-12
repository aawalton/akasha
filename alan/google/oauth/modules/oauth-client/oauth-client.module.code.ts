export interface GoogleOauthRefreshCredentials {
  readonly clientId: string
  readonly clientSecret: string
  readonly refreshToken: string
}

export interface GoogleOauthClientLike {
  setCredentials: (credentials: { readonly refresh_token: string }) => void
}

export type GoogleOauthClientMaker<Client extends GoogleOauthClientLike> = new (options: {
  readonly clientId: string
  readonly clientSecret: string
}) => Client

export function makeGoogleOauthClient<Client extends GoogleOauthClientLike>(
  oauth2: GoogleOauthClientMaker<Client>,
  credentials: GoogleOauthRefreshCredentials
): Client {
  const client = new oauth2({
    clientId: credentials.clientId,
    clientSecret: credentials.clientSecret,
  })
  client.setCredentials({ refresh_token: credentials.refreshToken })
  return client
}
