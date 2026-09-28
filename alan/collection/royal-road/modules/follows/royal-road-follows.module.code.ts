import {
  betweenRequests,
  fetchHtml,
  royalRoadUrl,
  USER_AGENT,
} from "akasha/alan/collection/royal-road/modules/pages/royal-road-pages.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { secretsIn } from "akasha/page/modules/secret/page-secret.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const ACCOUNT_PAGE_TYPE = "royal-road-account"
const ACCOUNT = "alan"
const EMAIL = "email"
const PASSWORD = "password"
const SIGN_IN = "/account/login"
const FOLLOWS = "/my/follows"
const SIGNED_IN = ".AspNetCore.Identity.Application"
const FORM = 'class="form-login-details"'
const TOKEN = /name="__RequestVerificationToken" type="hidden" value="([^"]+)"/
const ITEM = '<div class="fiction-list-item row">'
const FICTION = /<h2 class="fiction-title">\s*<a href="\/fiction\/(\d+)\/([^"/]+)"/
const LAST_READ = /Last\s+Read:\s*<a[^>]*href="\/fiction\/\d+\/[^"/]+\/chapter\/(\d+)\//i
const PAGE_NUMBER = /data-page='(\d+)'/g
const LIST = 'id="result"'

export class SignInRefused extends Error {}

export interface Followed {
  readonly fictionId: string
  readonly fictionSlug: string
  readonly lastReadChapterId: string | null
}

export interface FollowPage {
  readonly followed: readonly Followed[]
  readonly pages: number
}

export function parseFollowPage(html: string): FollowPage | null {
  if (!html.includes(LIST)) return null
  const followed: Followed[] = []
  for (const item of html.split(ITEM).slice(1)) {
    const fiction = FICTION.exec(item)
    if (fiction?.[1] === undefined || fiction[2] === undefined) continue
    followed.push({
      fictionId: fiction[1],
      fictionSlug: fiction[2],
      lastReadChapterId: LAST_READ.exec(item)?.[1] ?? null,
    })
  }
  const numbers = [...html.matchAll(PAGE_NUMBER)].map((one) => Number(one[1]))
  return { followed, pages: Math.max(1, ...numbers) }
}

export function tokenIn(html: string): string | null {
  const form = html.indexOf(FORM)
  if (form < 0) return null
  return TOKEN.exec(html.slice(form))?.[1] ?? null
}

type Jar = Map<string, string>

function kept(jar: Jar, response: Response): undefined {
  for (const one of response.headers.getSetCookie()) {
    const pair = one.split(";")[0] ?? ""
    const at = pair.indexOf("=")
    if (at > 0) jar.set(pair.slice(0, at), pair.slice(at + 1))
  }
  return undefined
}

function cookieOf(jar: Jar): string {
  return [...jar].map(([name, value]) => `${name}=${value}`).join("; ")
}

function account(root: string): { readonly email: string; readonly password: string } {
  const named = `${ACCOUNT_PAGE_TYPE}/${ACCOUNT}`
  const path = listedAt(root, ACCOUNT_PAGE_TYPE, ACCOUNT)[0]?.path
  if (path === undefined) throw new SignInRefused(`${named} is filed nowhere`)
  const email = textAt(valueAt(path, root) ?? {}, EMAIL)
  const password = secretsIn(root, path)?.get(PASSWORD)
  if (email === null) throw new SignInRefused(`${named} states no ${EMAIL}`)
  if (password === undefined) throw new SignInRefused(`${named} holds no ${PASSWORD} secret`)
  return { email, password }
}

export async function signedIn(root: string): Promise<string> {
  const { email, password } = account(root)
  const jar: Jar = new Map()
  const url = royalRoadUrl(SIGN_IN)
  const form = await fetch(url, { headers: { "user-agent": USER_AGENT } })
  kept(jar, form)
  const token = tokenIn(await form.text())
  if (token === null) {
    throw new SignInRefused(`${url} answered ${form.status} with no sign-in form to fill`)
  }
  await betweenRequests()
  const answer = await fetch(url, {
    method: "POST",
    redirect: "manual",
    headers: {
      "user-agent": USER_AGENT,
      "content-type": "application/x-www-form-urlencoded",
      cookie: cookieOf(jar),
    },
    body: new URLSearchParams({
      __RequestVerificationToken: token,
      ReturnUrl: "",
      Email: email,
      Password: password,
      Remember: "false",
    }),
  })
  kept(jar, answer)
  if (!jar.has(SIGNED_IN)) {
    throw new SignInRefused(
      `${url} answered ${answer.status} to ${email}'s sign-in and set no ${SIGNED_IN} cookie`
    )
  }
  return cookieOf(jar)
}

export async function readFollows(cookie: string): Promise<readonly Followed[]> {
  const followed: Followed[] = []
  let pages = 1
  for (let page = 1; page <= pages; page += 1) {
    await betweenRequests()
    const url = royalRoadUrl(`${FOLLOWS}?page=${page}`)
    const read = parseFollowPage(await fetchHtml(url, cookie))
    if (read === null) throw new SignInRefused(`${url} answered with no follow list`)
    followed.push(...read.followed)
    pages = read.pages
  }
  if (followed.length === 0) {
    throw new SignInRefused(
      `the follow list answered with no fiction. An empty answer is a broken read rather than ` +
        `an empty list, and syncing on it would unfollow every story.`
    )
  }
  return followed
}
