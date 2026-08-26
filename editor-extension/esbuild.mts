/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * @fileoverview Build script for the ops extension.
 *
 * This extension resolves every bare specifier out of its own `node_modules`, installed from
 * the dependencies its own `package.json` declares. Nothing here reaches into a checkout
 * beside this one, so the typechecker and esbuild walk up to the same copy of each package.
 *
 * That agreement is load-bearing rather than tidy. When the two resolvers disagreed about
 * `zod` — v3 in the editor tree, v4 in the code checkout this extension used to borrow — the
 * bundle built clean, the typecheck passed, and it threw `O.looseObject is not a function` at
 * load. Declaring the version here is what settles that.
 *
 * `vscode` is external: the extension host supplies it at load, so it is never bundled. The
 * `paths` block in `tsconfig.json` points the TYPECHECK at this fork's own `vscode.d.ts`,
 * which carries the seven API additions this extension uses that Microsoft's published
 * `@types/vscode` does not declare.
 */

import path from 'node:path';
import esbuild from 'esbuild';

const srcDir = path.join(import.meta.dirname, 'src');
const outDir = path.join(import.meta.dirname, 'dist');

function optionsFor(outdir: string): esbuild.BuildOptions {
	return {
		platform: 'node',
		format: 'cjs',
		mainFields: ['module', 'main'],
		bundle: true,
		minify: true,
		treeShaking: true,
		sourcemap: true,
		target: ['es2024'],
		external: ['vscode'],
		entryPoints: [path.join(srcDir, 'extension.ts')],
		outdir,
		logOverride: {
			'import-is-undefined': 'error',
		},
	};
}

async function tryBuild(options: esbuild.BuildOptions): Promise<void> {
	try {
		await esbuild.build(options);
	} catch (err) {
		console.error(err);
	}
}

const args = process.argv;
let outdir = outDir;
const outputRootIndex = args.indexOf('--outputRoot');
if (outputRootIndex >= 0) {
	outdir = path.join(args[outputRootIndex + 1]!, path.basename(outDir));
}

const options = optionsFor(outdir);

if (args.indexOf('--watch') >= 0) {
	await tryBuild(options);
	const watcher = await import('@parcel/watcher');
	watcher.subscribe(srcDir, () => tryBuild(options));
} else {
	await esbuild.build(options).catch(() => process.exit(1));
}
