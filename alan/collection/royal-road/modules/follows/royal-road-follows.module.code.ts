import {
  accountPage,
  answerFrom,
  betweenRequests,
  checkedText,
  fetchHtml,
  royalRoadUrl,
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
const READ_LATER = "/my/readlater"
const SIGNED_IN = ".AspNetCore.Identity.Application"
const FORM = 'class="form-login-details"'
const FORM_FIELDS = "form.form-login-details"
const SIGN_IN_CEILING_MS = 60_000
const ITEM = '<div class="fiction-list-item row">'
const FICTION = /<h2 class="fiction-title">\s*<a [^>]*href="\/fiction\/(\d+)\/([^"/]+)"/
const LAST_READ = /Last\s+Read:\s*<a[^>]*href="\/fiction\/\d+\/[^"/]+\/chapter\/(\d+)\//i
const PAGE_NUMBER = /data-page='(\d+)'/g
const LIST = 'id="result"'

class SignInRefused extends Error {}

export interface Listed {
  readonly fictionId: string
  readonly fictionSlug: string
  readonly lastReadChapterId: string | null
}

interface FollowPage {
  readonly followed: readonly Listed[]
  readonly pages: number
}

export function parseFollowPage(html: string): FollowPage | null {
  if (!html.includes(LIST)) return null
  const followed: Listed[] = []
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

export async function signedIn(root: string): Promise<void> {
  const { email, password } = account(root)
  const url = royalRoadUrl(SIGN_IN)
  const form = await answerFrom(url, true)
  if (!(await checkedText(url, form)).includes(FORM)) {
    throw new SignInRefused(`${url} answered ${form.status} with no sign-in form to fill`)
  }
  await betweenRequests()
  const page = await accountPage()
  const fields = page.locator(FORM_FIELDS)
  await fields.locator('input[name="Email"]').fill(email)
  await fields.locator('input[name="Password"]').fill(password)
  const [answer] = await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: SIGN_IN_CEILING_MS }),
    fields.locator('button[type="submit"]').click(),
  ])
  const cookies = await page.context().cookies()
  if (!cookies.some((one) => one.name === SIGNED_IN)) {
    throw new SignInRefused(
      `${url} answered ${answer?.status() ?? "nothing"} to ${email}'s sign-in and set no ` +
        `${SIGNED_IN} cookie`
    )
  }
}

async function readList(path: string, named: string): Promise<readonly Listed[]> {
  const listed: Listed[] = []
  let pages = 1
  for (let page = 1; page <= pages; page += 1) {
    await betweenRequests()
    const url = royalRoadUrl(`${path}?page=${page}`)
    const read = parseFollowPage(await fetchHtml(url, true))
    if (read === null) throw new SignInRefused(`${url} answered with no ${named}`)
    listed.push(...read.followed)
    pages = read.pages
  }
  if (listed.length === 0) {
    throw new SignInRefused(
      `the ${named} answered with no fiction. An empty answer is a broken read rather than ` +
        `an empty list, and syncing on it would take every story off that list.`
    )
  }
  return listed
}

export function readFollows(): Promise<readonly Listed[]> {
  return readList(FOLLOWS, "follow list")
}

export function readReadLater(): Promise<readonly Listed[]> {
  return readList(READ_LATER, "read later list")
}
